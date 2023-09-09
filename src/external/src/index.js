"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getMeetingStatus = void 0;
var config = require("./config");
var googleapis_1 = require("googleapis");
// https://developers.google.com/calendar/api/guides/push
// https://stackoverflow.com/questions/71018001/how-to-set-up-a-google-calendar-web-hook-in-nodejs
// https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/outlook-quickstart?tabs=yeomangenerator
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events"
];
var jwtClient = new googleapis_1.google.auth.JWT(config.GOOGLE_CLIENT_EMAIL, undefined, config.GOOGLE_CLIENT_KEY, SCOPES);
var calendar = googleapis_1.google.calendar({ version: "v3", auth: jwtClient });
function getMeetingStatus(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, weekRange, events, meetingStatus, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (req.query.timestamp) {
                        timestamp = new Date((req.query.timestamp || ""));
                    }
                    weekRange = getWeekStartEnd(timestamp);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, calendar.events.list({
                            calendarId: config.ADMIN_EMAIL,
                            timeMin: weekRange.start,
                            timeMax: weekRange.end
                        })];
                case 2:
                    events = _b.sent();
                    meetingStatus = (_a = events.data.items) === null || _a === void 0 ? void 0 : _a.map(function (event) {
                        var _a, _b;
                        return {
                            start: new Date((_a = event === null || event === void 0 ? void 0 : event.start) === null || _a === void 0 ? void 0 : _a.dateTime).toISOString(),
                            end: new Date((_b = event === null || event === void 0 ? void 0 : event.end) === null || _b === void 0 ? void 0 : _b.dateTime).toISOString()
                        };
                    });
                    res.status(HTTP_STATUS.OK).send({
                        count: meetingStatus === null || meetingStatus === void 0 ? void 0 : meetingStatus.length,
                        docs: meetingStatus
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    throwResumeError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.GOOGLE_CONNECTIVITY_ERROR, req, error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getMeetingStatus = getMeetingStatus;
