"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var EventsService = (function () {
    function EventsService(http) {
        this.http = http;
        this.apiUrl = 'http://eventmanagerapiaspnetcore.azurewebsites.net/api/events';
    }
    EventsService.prototype.getEvents = function () {
        return this.http.get(this.apiUrl /* + '?t=' + Math.random()*/)
            .map(function (response) { return response.json(); });
    };
    EventsService.prototype.createEvent = function (event) {
        var data = JSON.stringify(event);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventsService.prototype.updateEvent = function (event) {
        var data = JSON.stringify(event);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.apiUrl + '/' + event.id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventsService.prototype.deleteEvent = function (eventId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.apiUrl + '/' + eventId, options)
            .catch(this.handleError);
    };
    EventsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    EventsService.prototype.handleError = function (error) {
        console.log(error);
        var errMsg = error.status ? error.status + '-' + error.statusText : 'Server error';
        throw (errMsg);
    };
    EventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
