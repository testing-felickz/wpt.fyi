// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/web-platform-tests/wpt.fyi/shared (interfaces: Datastore)

// Package sharedtest is a generated GoMock package.
package sharedtest

import (
	context "context"
	reflect "reflect"
	time "time"

	golang_set "github.com/deckarep/golang-set"
	gomock "github.com/golang/mock/gomock"
	shared "github.com/web-platform-tests/wpt.fyi/shared"
)

// MockDatastore is a mock of Datastore interface
type MockDatastore struct {
	ctrl     *gomock.Controller
	recorder *MockDatastoreMockRecorder
}

// MockDatastoreMockRecorder is the mock recorder for MockDatastore
type MockDatastoreMockRecorder struct {
	mock *MockDatastore
}

// NewMockDatastore creates a new mock instance
func NewMockDatastore(ctrl *gomock.Controller) *MockDatastore {
	mock := &MockDatastore{ctrl: ctrl}
	mock.recorder = &MockDatastoreMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockDatastore) EXPECT() *MockDatastoreMockRecorder {
	return m.recorder
}

// Context mocks base method
func (m *MockDatastore) Context() context.Context {
	ret := m.ctrl.Call(m, "Context")
	ret0, _ := ret[0].(context.Context)
	return ret0
}

// Context indicates an expected call of Context
func (mr *MockDatastoreMockRecorder) Context() *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Context", reflect.TypeOf((*MockDatastore)(nil).Context))
}

// Get mocks base method
func (m *MockDatastore) Get(arg0 shared.Key, arg1 interface{}) error {
	ret := m.ctrl.Call(m, "Get", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// Get indicates an expected call of Get
func (mr *MockDatastoreMockRecorder) Get(arg0, arg1 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Get", reflect.TypeOf((*MockDatastore)(nil).Get), arg0, arg1)
}

// GetAll mocks base method
func (m *MockDatastore) GetAll(arg0 shared.Query, arg1 interface{}) ([]shared.Key, error) {
	ret := m.ctrl.Call(m, "GetAll", arg0, arg1)
	ret0, _ := ret[0].([]shared.Key)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetAll indicates an expected call of GetAll
func (mr *MockDatastoreMockRecorder) GetAll(arg0, arg1 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetAll", reflect.TypeOf((*MockDatastore)(nil).GetAll), arg0, arg1)
}

// GetMulti mocks base method
func (m *MockDatastore) GetMulti(arg0 []shared.Key, arg1 interface{}) error {
	ret := m.ctrl.Call(m, "GetMulti", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// GetMulti indicates an expected call of GetMulti
func (mr *MockDatastoreMockRecorder) GetMulti(arg0, arg1 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMulti", reflect.TypeOf((*MockDatastore)(nil).GetMulti), arg0, arg1)
}

// LoadTestRuns mocks base method
func (m *MockDatastore) LoadTestRuns(arg0 []shared.ProductSpec, arg1 golang_set.Set, arg2 []string, arg3, arg4 *time.Time, arg5, arg6 *int) (shared.TestRunsByProduct, error) {
	ret := m.ctrl.Call(m, "LoadTestRuns", arg0, arg1, arg2, arg3, arg4, arg5, arg6)
	ret0, _ := ret[0].(shared.TestRunsByProduct)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// LoadTestRuns indicates an expected call of LoadTestRuns
func (mr *MockDatastoreMockRecorder) LoadTestRuns(arg0, arg1, arg2, arg3, arg4, arg5, arg6 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoadTestRuns", reflect.TypeOf((*MockDatastore)(nil).LoadTestRuns), arg0, arg1, arg2, arg3, arg4, arg5, arg6)
}

// LoadTestRunsByKeys mocks base method
func (m *MockDatastore) LoadTestRunsByKeys(arg0 shared.KeysByProduct) (shared.TestRunsByProduct, error) {
	ret := m.ctrl.Call(m, "LoadTestRunsByKeys", arg0)
	ret0, _ := ret[0].(shared.TestRunsByProduct)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// LoadTestRunsByKeys indicates an expected call of LoadTestRunsByKeys
func (mr *MockDatastoreMockRecorder) LoadTestRunsByKeys(arg0 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoadTestRunsByKeys", reflect.TypeOf((*MockDatastore)(nil).LoadTestRunsByKeys), arg0)
}

// NewKey mocks base method
func (m *MockDatastore) NewKey(arg0 string, arg1 int64) shared.Key {
	ret := m.ctrl.Call(m, "NewKey", arg0, arg1)
	ret0, _ := ret[0].(shared.Key)
	return ret0
}

// NewKey indicates an expected call of NewKey
func (mr *MockDatastoreMockRecorder) NewKey(arg0, arg1 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "NewKey", reflect.TypeOf((*MockDatastore)(nil).NewKey), arg0, arg1)
}

// NewQuery mocks base method
func (m *MockDatastore) NewQuery(arg0 string) shared.Query {
	ret := m.ctrl.Call(m, "NewQuery", arg0)
	ret0, _ := ret[0].(shared.Query)
	return ret0
}

// NewQuery indicates an expected call of NewQuery
func (mr *MockDatastoreMockRecorder) NewQuery(arg0 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "NewQuery", reflect.TypeOf((*MockDatastore)(nil).NewQuery), arg0)
}
