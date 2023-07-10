/**
 * Copyright 2023 The WPT Dashboard Project. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
const pageStyle = getComputedStyle(document.body);

const PASS_COLOR = pageStyle.getPropertyValue('--paper-green-300');
const FAIL_COLOR = pageStyle.getPropertyValue('--paper-red-300');
const NEUTRAL_COLOR = pageStyle.getPropertyValue('--paper-grey-300');
const COLOR_MAPPING = {
  // Passing statuses
  OK: PASS_COLOR,
  PASS: PASS_COLOR,

  // Failing statuses
  CRASHED: FAIL_COLOR,
  ERROR: FAIL_COLOR,
  FAIL: FAIL_COLOR,
  NOTRUN: FAIL_COLOR,
  PRECONDITION_FAILED: FAIL_COLOR,
  TIMEOUT: FAIL_COLOR,

  // Neutral statuses
  MISSING: NEUTRAL_COLOR,
  SKIPPED: NEUTRAL_COLOR,
  default: NEUTRAL_COLOR,
};

class TestResultsGrid extends PolymerElement {
  static get template() {
    return html`
        <style>
          .chart {
            height: 15rem;
          }
          .chart rect, .chart text {
            cursor: pointer;
          }
          .browser {
            height: 2rem;
            margin-bottom: -0.5rem;
          }
        </style>
        <h2>
          <img class="browser" alt="chrome chrome,dev,experimental,master,taskcluster,user:chromium-wpt-export-bot,prod logo" src="/static/chrome-dev_64x64.png">
          Chrome
        </h2>
        <div class="chart" id="chromeHistoryChart"></div>

        <h2>
          <img class="browser" alt="edge azure,dev,edge,edgechromium,experimental,master,prod logo" src="/static/edge-dev_64x64.png">
          Edge
        </h2>
        <div class="chart" id="edgeHistoryChart"></div>

        <h2>
          <img class="browser" alt="firefox experimental,firefox,master,nightly,taskcluster,user:chromium-wpt-export-bot,prod logo" src="/static/firefox-nightly_64x64.png">
          Firefox
        </h2>
        <div class="chart" id="firefoxHistoryChart"></div>

        <h2>
          <img class="browser" alt="safari azure,experimental,master,preview,safari,prod logo" src="/static/safari-preview_64x64.png">
          Safari
        </h2>
        <div class="chart" id="safariHistoryChart"></div>
        `;
  }

  static get properties() {
    return {
      dataTable: Object,
      runIDs: Array,
    };
  }

  static get is() {
    return 'new-test-results-history-grid';
  }

  constructor() {
    super();

    // Get the test history data and then populate the chart
    Promise.all([
      this.getTestHistory(),
      this.loadCharts()
    ]).then(() => this.updateAllCharts(this.historicalData));

    // Google Charts is not responsive, even if one sets a percentage-width, so
    // we add a resize observer to redraw the chart if the size changes.
    window.addEventListener('resize', () => {
      this.updateAllCharts(this.historicalData);
    });
  }

  // Load Google charts for test history display
  async loadCharts() {
    await window.google.charts.load('current', { packages: ['timeline'] });
  }

  updateAllCharts(historicalData) {
    const divNames = [
      'chromeHistoryChart',
      'edgeHistoryChart',
      'firefoxHistoryChart',
      'safariHistoryChart'
    ];

    divNames.forEach((name, i) => {
      this.updateChart(historicalData[i], name);
    });
  }

  updateChart(browserTestData, divID) {
    // Our observer may be called before the historical data has been fetched,
    // so debounce that.
    if (!browserTestData) {
      return;
    }

    // Fetching the data table first ensures that Google Charts has been loaded.
    // Using timeline chart
    // https://developers.google.com/chart/interactive/docs/gallery/timeline
    const div = this.$[divID];
    this.chart = new window.google.visualization.Timeline(div);

    this.dataTable = new window.google.visualization.DataTable();

    // Set up columns, including tooltip information and style guidelines
    this.dataTable.addColumn({ type: 'string', id: 'Subtest' });
    this.dataTable.addColumn({ type: 'string', id: 'Status' });

    // style and tooltip columns that are not displayed
    this.dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    this.dataTable.addColumn({ type: 'string', role: 'tooltip' });

    this.dataTable.addColumn({ type: 'date', id: 'Start' });
    this.dataTable.addColumn({ type: 'date', id: 'End' });

    const dataTableRows = [];
    const now = new Date();
    this.runIDs = [];

    // Create a row for each subtest
    this.subtestNames.forEach(subtestName => {
      for (let i = 0; i < browserTestData[subtestName].length; i++) {
        const dataPoint = browserTestData[subtestName][i];
        const startDate = new Date(Number(dataPoint.date));

        // Use the next entry as the end date, or use present time if this
        // is the last entry
        let endDate = now;
        if (i + 1 !== browserTestData[subtestName].length) {
          const nextDataPoint = browserTestData[subtestName][i + 1];
          endDate = new Date(Number(nextDataPoint.date));
        }

        // If this is the main test status, name it based on the amount of subtests
        let subtestDisplayName = subtestName;
        if (subtestName === '') {
          subtestDisplayName = (this.subtestNames.length > 1) ? 'Harness status' : 'Test status';
        }

        const tooltip =
          `${dataPoint.status} ${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`;
        const statusColor = COLOR_MAPPING[dataPoint.status] || COLOR_MAPPING.default;

        // Add the run ID to array of run IDs to use for links
        this.runIDs.push(dataPoint.run_id);

        dataTableRows.push([
          subtestDisplayName,
          dataPoint.status,
          statusColor,
          tooltip,
          startDate,
          endDate,
        ]);
      }
    });

    let options = {
      tooltip: {
        isHtml: false,
      },
    };
    this.dataTable.addRows(dataTableRows);

    // handler to allow rows to be clicked and navigate to the run url
    // https://stackoverflow.com/questions/40928971/how-to-customize-google-chart-with-hyperlink-in-the-label
    const statusSelectHandler = () => {
      const selection = this.chart.getSelection();
      if (selection.length > 0) {
        const index = selection[0].row;
        if (index !== undefined && this.runIDs.length > index) {
          window.open(`/results/?run_id=${this.runIDs[index]}`, '_blank');
        }
      }
    };
    window.google.visualization.events.addListener(this.chart, 'select', statusSelectHandler);

    this.chart.draw(this.dataTable, options);
  }

  // get test history and aligned run data
  async getTestHistory() {
    this.historicalData = await fetch('/api/history')
      .then(r => r.json()).then(data => data.results);
    this.subtestNames = Object.keys(this.historicalData[0]);
  }
}


window.customElements.define(TestResultsGrid.is, TestResultsGrid);

export { TestResultsGrid };