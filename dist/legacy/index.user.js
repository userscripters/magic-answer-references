// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Make referencing other answers easier
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @homepage        https://github.com/userscripters/magic-answer-references#readme
// @match           https://*.stackexchange.com/questions/*
// @match           https://askubuntu.com/questions/*
// @match           https://es.meta.stackoverflow.com/questions/*
// @match           https://es.stackoverflow.com/questions/*
// @match           https://ja.meta.stackoverflow.com/questions/*
// @match           https://ja.stackoverflow.com/questions/*
// @match           https://mathoverflow.net/questions/*
// @match           https://meta.askubuntu.com/questions/*
// @match           https://meta.mathoverflow.net/questions/*
// @match           https://meta.serverfault.com/questions/*
// @match           https://meta.stackoverflow.com/questions/*
// @match           https://meta.superuser.com/questions/*
// @match           https://pt.meta.stackoverflow.com/questions/*
// @match           https://pt.stackoverflow.com/questions/*
// @match           https://ru.meta.stackoverflow.com/questions/*
// @match           https://ru.stackoverflow.com/questions/*
// @match           https://serverfault.com/questions/*
// @match           https://stackapps.com/questions/*
// @match           https://stackoverflow.com/questions/*
// @match           https://superuser.com/questions/*
// @name            Magic Answer References
// @namespace       userscripters
// @require         https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at          document-start
// @source          git+https://github.com/userscripters/magic-answer-references.git
// @supportURL      https://github.com/userscripters/magic-answer-references/issues
// @version         1.0.0
// ==/UserScript==

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    var scriptName, API_BASE, API_VER, waitForSelector, makeStacksIcon, makeDraggable, makeStacksModal, makeStacksTableRow, makeStacksTable, makeStacksTextInput, makeAnchor, appendStyles, makeStacksButton, makeEditorButton, scrapePost, scrapePostsOnPage, insertPostReference, getQuestionId, getAnswerId, postLinkExpr, isPostLink, getAPIsite, delay, getPost, actionBtnConfig, postInfoToTableRowConfig, editor, menu, snippetBtn, postTextInput, configModal, configForm, posts, _a, refTableWrapper, refTable_1, _b, searchWrapper, searchInput_1, storage, store, seAPIkeyKey, key_1, apiPostCache_1, refBtn;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                scriptName = "magic-answer-references";
                API_BASE = "https://api.stackexchange.com";
                API_VER = 2.3;
                waitForSelector = function (selector, context) {
                    if (context === void 0) { context = document; }
                    return new Promise(function (resolve) {
                        var foundAtInitTime = context.querySelector(selector);
                        if (foundAtInitTime)
                            resolve(foundAtInitTime);
                        var mo = new MutationObserver(function () {
                            var foundAtObserveTime = context.querySelector(selector);
                            if (foundAtObserveTime) {
                                mo.disconnect();
                                resolve(foundAtObserveTime);
                            }
                        });
                        mo.observe(context, {
                            subtree: true,
                            childList: true,
                            attributes: true
                        });
                    });
                };
                makeStacksIcon = function (name, pathConfig, namespace) {
                    if (namespace === void 0) { namespace = "http://www.w3.org/2000/svg"; }
                    var svg = document.createElementNS(namespace, "svg");
                    svg.classList.add("svg-icon", name);
                    svg.setAttribute("width", "18");
                    svg.setAttribute("height", "18");
                    svg.setAttribute("viewBox", "0 0 18 18");
                    svg.setAttribute("aria-hidden", "true");
                    var path = document.createElementNS(namespace, "path");
                    path.setAttribute("d", pathConfig);
                    svg.append(path);
                    return svg;
                };
                makeDraggable = function (id) {
                    document.addEventListener("dragstart", function (_a) {
                        var dataTransfer = _a.dataTransfer;
                        var dummy = document.createElement("img");
                        dummy.src = "data:image/png;base64,AAAAAA==";
                        dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
                    });
                    var previousX = 0;
                    var previousY = 0;
                    var zeroed = 0;
                    var isDragging = false;
                    var handleCoordChange = function (_a) {
                        var clientX = _a.clientX, clientY = _a.clientY;
                        var modal = document.getElementById(id);
                        if (!modal)
                            return;
                        previousX || (previousX = clientX);
                        previousY || (previousY = clientY);
                        var _b = modal.style, top = _b.top, left = _b.left;
                        if (!top && !left) {
                            var computed = window.getComputedStyle(modal);
                            top = computed.top;
                            left = computed.left;
                        }
                        var moveX = clientX - previousX;
                        var moveY = clientY - previousY;
                        var superSonic = 500;
                        if ([moveX, moveY].map(Math.abs).some(function (c) { return c > superSonic; }))
                            return;
                        var style = modal.style;
                        style.left = "".concat(parseInt(left) + moveX, "px");
                        style.top = "".concat(parseInt(top) + moveY, "px");
                        previousX = clientX;
                        previousY = clientY;
                    };
                    document.addEventListener("dragstart", function (event) {
                        var target = event.target;
                        if (target === document.getElementById(id))
                            isDragging = true;
                    });
                    document.addEventListener("dragend", function (_a) {
                        var target = _a.target;
                        if (target === document.getElementById(id)) {
                            isDragging = false;
                            previousX = 0;
                            previousY = 0;
                        }
                    });
                    document.addEventListener("drag", function (event) {
                        zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;
                        if (zeroed >= 3 || !isDragging)
                            return;
                        return handleCoordChange(event);
                    });
                    document.addEventListener("dragover", function (e) {
                        if (isDragging)
                            e.preventDefault();
                        if (zeroed < 3 || !isDragging)
                            return;
                        return handleCoordChange(e);
                    });
                };
                makeStacksModal = function (id, header, options) {
                    var minWidth = options.minWidth;
                    var ariaLabelId = "modal-title";
                    var ariaDescrId = "modal-description";
                    var wrap = document.createElement("aside");
                    wrap.classList.add("s-modal");
                    wrap.id = id;
                    wrap.tabIndex = -1;
                    wrap.setAttribute("role", "dialog");
                    wrap.setAttribute("aria-labelledby", ariaLabelId);
                    wrap.setAttribute("aria-describeddy", ariaDescrId);
                    wrap.setAttribute("aria-hidden", "true");
                    var dataset = wrap.dataset;
                    dataset.sModalTarget = "modal";
                    dataset.controller = "s-modal";
                    var doc = document.createElement("div");
                    doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", "wmn".concat(minWidth));
                    doc.setAttribute("role", "document");
                    doc.id = "".concat(id, "-document");
                    doc.draggable = true;
                    var title = document.createElement("h1");
                    title.classList.add("s-modal--header");
                    title.id = ariaLabelId;
                    title.textContent = header;
                    var form = document.createElement("form");
                    form.classList.add("s-modal--body", "d-flex", "fd-column", "flex__allcells6", "fw-wrap", "gs16");
                    var close = document.createElement("button");
                    close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
                    close.type = "button";
                    close.dataset.action = "s-modal#hide";
                    var closeIcon = makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z");
                    makeDraggable(doc.id);
                    close.append(closeIcon);
                    doc.append(title, form, close);
                    wrap.append(doc);
                    return wrap;
                };
                makeStacksTableRow = function (cells, data) {
                    var row = document.createElement("tr");
                    Object.assign(row.dataset, data || {});
                    row.append.apply(row, __spreadArray([], __read(cells.map(function (content) {
                        var td = document.createElement("td");
                        td.append(content);
                        return td;
                    })), false));
                    return row;
                };
                makeStacksTable = function (id, options) {
                    var _a;
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, headers = options.headers, _c = options.rows, rows = _c === void 0 ? [] : _c;
                    var wrapper = document.createElement("div");
                    (_a = wrapper.classList).add.apply(_a, __spreadArray(["s-table-container"], __read(classes), false));
                    var table = document.createElement("table");
                    table.classList.add("s-table");
                    table.id = id;
                    var head = document.createElement("thead");
                    var headRow = document.createElement("tr");
                    headRow.append.apply(headRow, __spreadArray([], __read(headers.map(function (hdr) {
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.append(hdr);
                        return th;
                    })), false));
                    var body = document.createElement("tbody");
                    body.append.apply(body, __spreadArray([], __read(rows.map(function (_a) {
                        var cells = _a.cells, data = _a.data;
                        return makeStacksTableRow(cells, data);
                    })), false));
                    head.append(headRow);
                    table.append(head, body);
                    wrapper.append(table);
                    return [wrapper, table];
                };
                makeStacksTextInput = function (id, options) {
                    var _a;
                    if (options === void 0) { options = {}; }
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.placeholder, placeholder = _c === void 0 ? "" : _c, _d = options.title, title = _d === void 0 ? "" : _d, _e = options.value, value = _e === void 0 ? "" : _e;
                    var wrap = document.createElement("div");
                    (_a = wrap.classList).add.apply(_a, __spreadArray(["d-flex", "gs4", "gsy", "fd-column"], __read(classes), false));
                    var inputWrap = document.createElement("div");
                    inputWrap.classList.add("d-flex", "ps-relative");
                    var input = document.createElement("input");
                    input.classList.add("s-input");
                    input.id = id;
                    input.type = "text";
                    input.placeholder = placeholder;
                    input.value = value;
                    inputWrap.append(input);
                    wrap.append(inputWrap);
                    if (title) {
                        var lblWrap = document.createElement("div");
                        lblWrap.classList.add("flex--item");
                        var label = document.createElement("label");
                        label.classList.add("d-block", "s-label");
                        label.htmlFor = id;
                        label.textContent = title;
                        lblWrap.append(label);
                        wrap.prepend(lblWrap);
                        return [wrap, input, label];
                    }
                    return [wrap, input];
                };
                makeAnchor = function (url, title) {
                    var a = document.createElement("a");
                    a.href = url;
                    a.title = a.textContent = title;
                    a.target = "_blank";
                    return a;
                };
                appendStyles = function () {
                    var style = document.createElement("style");
                    document.head.append(style);
                    var sheet = style.sheet;
                    if (!sheet)
                        return;
                    var rules = [
                        ".".concat(scriptName, ".wmd-button > .svg-icon {\n                margin-top: 2px;\n                color: var(--black-600);\n            }"),
                        ".".concat(scriptName, ".wmd-button > .svg-icon:hover {\n                color: var(--black-900);\n            }"),
                        "table.".concat(scriptName, " td:first-child {\n                cursor: pointer;\n            }"),
                        "table.".concat(scriptName, " thead {\n                position: sticky;\n                top: -1px;\n                z-index: 9999;\n            }"),
                        ".s-table td {\n                border-bottom: 1px solid var(--bc-medium);\n            }"
                    ];
                    rules.forEach(function (rule) { return sheet.insertRule(rule); });
                };
                makeStacksButton = function (id, text, _a) {
                    var _b;
                    var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, title = _c.title, _e = _c.danger, danger = _e === void 0 ? false : _e, _f = _c.loading, loading = _f === void 0 ? false : _f, _g = _c.muted, muted = _g === void 0 ? false : _g, _h = _c.primary, primary = _h === void 0 ? false : _h, _j = _c.type, type = _j === void 0 ? "filled" : _j;
                    var btn = document.createElement("button");
                    btn.id = id;
                    btn.textContent = text;
                    (_b = btn.classList).add.apply(_b, __spreadArray(["s-btn", "s-btn__".concat(type)], __read(classes), false));
                    btn.setAttribute("role", "button");
                    btn.setAttribute("aria-label", title || text);
                    if (danger)
                        btn.classList.add("s-btn__danger");
                    if (muted)
                        btn.classList.add("s-btn__muted");
                    if (primary)
                        btn.classList.add("s-btn__primary");
                    if (loading)
                        btn.classList.add("is-loading");
                    if (title) {
                        btn.title = title;
                    }
                    return btn;
                };
                makeEditorButton = function (id, iconName, path, title, action) {
                    var wrapper = document.createElement("li");
                    wrapper.classList.add("wmd-button", scriptName);
                    wrapper.id = id;
                    wrapper.title = title;
                    wrapper.append(makeStacksIcon(iconName, path));
                    wrapper.addEventListener("click", action);
                    return wrapper;
                };
                scrapePost = function (container, type) {
                    var _a, _b, _c, _d;
                    var voteCell = container.querySelector(".js-vote-count");
                    var votes = ((_a = voteCell === null || voteCell === void 0 ? void 0 : voteCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "0";
                    var _e = container.dataset, answerid = _e.answerid, questionid = _e.questionid;
                    var id = type === "answer" ? answerid : questionid;
                    if (!id) {
                        console.debug("[".concat(scriptName, "] post is missing an id"));
                        return;
                    }
                    var bodyElem = container.querySelector(".js-post-body");
                    var body = ((_b = bodyElem === null || bodyElem === void 0 ? void 0 : bodyElem.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                    var link = "".concat(location.origin, "/").concat(type === "answer" ? "a" : "q", "/").concat(id);
                    var info = { body: body, container: container, id: id, link: link, type: type, votes: votes };
                    var authorLink = container.querySelector("[itemprop=author] a");
                    if (authorLink) {
                        info.authorLink = authorLink.href;
                        info.authorName = (_c = authorLink.textContent) === null || _c === void 0 ? void 0 : _c.trim();
                    }
                    if (!authorLink) {
                        var nameElement = container.querySelector("[itemprop=name]");
                        info.authorName = (_d = nameElement === null || nameElement === void 0 ? void 0 : nameElement.textContent) === null || _d === void 0 ? void 0 : _d.trim();
                    }
                    return info;
                };
                scrapePostsOnPage = function () {
                    var posts = new Map();
                    var answers = document.querySelectorAll(".answer");
                    answers.forEach(function (container) {
                        var info = scrapePost(container, "answer");
                        if (info)
                            posts.set(info.id, info);
                    });
                    var questions = document.querySelectorAll(".question");
                    questions.forEach(function (container) {
                        var info = scrapePost(container, "question");
                        if (info)
                            posts.set(info.id, info);
                    });
                    return posts;
                };
                insertPostReference = function (input, info) {
                    var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd, value = input.value;
                    var isCollapsed = selectionStart === selectionEnd;
                    var authorLink = info.authorLink, authorName = info.authorName, link = info.link, type = info.type;
                    var before = value.slice(0, selectionStart + 1);
                    var after = value.slice(selectionEnd - 1);
                    var authorRef = authorLink ? "[".concat(authorName, "](").concat(authorLink, ")") : authorName;
                    var postRef = "".concat(authorRef ? "".concat(authorRef, "'s ") : "", "[").concat(type, "](").concat(link, ")");
                    input.value = isCollapsed ? value + postRef : before + postRef + after;
                    input.dispatchEvent(new Event("input"));
                    document.dispatchEvent(new CustomEvent("".concat(scriptName, "-close-config")));
                };
                getQuestionId = function (text) {
                    var _a = __read(/^https:.+?\/q(?:uestions)?\/(\d+)(?:\/?\d*?$)/.exec(text) || [], 2), id = _a[1];
                    return id;
                };
                getAnswerId = function (text) {
                    var _a = __read(/^https:.+?\/(?:a\/(\d+)(?:\/?\d*?$)|questions\/.+?\/(\d+))/.exec(text) || [], 3), g1 = _a[1], g2 = _a[2];
                    return g1 || g2;
                };
                postLinkExpr = new RegExp("^https:.+?\\/(?:q(?:uestions)?|a)\\/\\d+(?:\\/|$)");
                isPostLink = function (text) { return postLinkExpr.test(text); };
                getAPIsite = function (text) {
                    var _a = __read(/^https:.+?\/([^\/]+)\//.exec(text) || [], 2), hostname = _a[1];
                    var normalized = hostname.split(".").slice(0, -1).join(".");
                    return normalized !== "meta.stackexchange" ?
                        normalized.replace(".stackexchange", "") :
                        normalized;
                };
                delay = function (ms) {
                    if (ms === void 0) { ms = 100; }
                    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
                };
                getPost = function (id, _a) { return __awaiter(void 0, void 0, void 0, function () {
                    var url, res, _b, _c, items, backoff;
                    var _d = _a.site, site = _d === void 0 ? "stackoverflow" : _d, rest = __rest(_a, ["site"]);
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                url = new URL("".concat(API_BASE, "/").concat(API_VER, "/posts/").concat(id));
                                url.search = new URLSearchParams(__assign({ site: site }, rest)).toString();
                                return [4, fetch(url.toString())];
                            case 1:
                                res = _e.sent();
                                if (!res.ok)
                                    return [2];
                                return [4, res.json()];
                            case 2:
                                _b = _e.sent(), _c = _b.items, items = _c === void 0 ? [] : _c, backoff = _b.backoff;
                                if (!backoff) return [3, 4];
                                return [4, delay(backoff * 1e3)];
                            case 3:
                                _e.sent();
                                return [2, getPost(id, __assign({ site: site }, rest))];
                            case 4: return [2, items[0]];
                        }
                    });
                }); };
                actionBtnConfig = {
                    classes: ["s-btn__xs", "w100"],
                    type: "outlined",
                    muted: true
                };
                postInfoToTableRowConfig = function (id, info) {
                    var authorName = info.authorName, authorLink = info.authorLink, body = info.body, container = info.container, type = info.type, votes = info.votes;
                    var author = authorLink && authorName ?
                        makeAnchor(authorLink, authorName) :
                        authorName || "";
                    var postType = document.createElement("span");
                    postType.textContent = type;
                    postType.addEventListener("click", function () {
                        if (!container)
                            return;
                        var scrollX = window.scrollX, scrollY = window.scrollY;
                        var _a = container.getBoundingClientRect(), top = _a.top, left = _a.left;
                        window.scrollTo(left + scrollX, top + scrollY);
                    });
                    var actionBtn = makeStacksButton("".concat(scriptName, "-ref-").concat(id), "ref", actionBtnConfig);
                    actionBtn.addEventListener("click", function (ev) {
                        ev.preventDefault();
                        insertPostReference(postTextInput, info);
                    });
                    return {
                        cells: [postType, author, votes, actionBtn],
                        data: { body: body, id: id }
                    };
                };
                editor = document.getElementById("post-editor");
                if (!editor) {
                    console.debug("[".concat(scriptName, "] missing post editor"));
                    return [2];
                }
                return [4, waitForSelector("#wmd-button-row")];
            case 1:
                menu = _c.sent();
                if (!menu) {
                    console.debug("[".concat(scriptName, "] missing editor menu"));
                    return [2];
                }
                return [4, waitForSelector("#wmd-snippet-button")];
            case 2:
                snippetBtn = _c.sent();
                if (!snippetBtn) {
                    console.debug("[".concat(scriptName, "] missing editor snippet button"));
                    return [2];
                }
                return [4, waitForSelector("#wmd-input")];
            case 3:
                postTextInput = _c.sent();
                if (!postTextInput) {
                    console.debug("[".concat(scriptName, "] missing editor input"));
                    return [2];
                }
                configModal = makeStacksModal("".concat(scriptName, "-config"), "Reference a Post", { minWidth: 25 });
                configForm = configModal.querySelector("form");
                if (!configForm) return [3, 6];
                posts = scrapePostsOnPage();
                _a = __read(makeStacksTable("".concat(scriptName, "-current-posts"), {
                    classes: [scriptName, "hmx2"],
                    headers: ["Type", "Author", "Score", "Actions"],
                    rows: __spreadArray([], __read(posts), false).map(function (_a) {
                        var _b = __read(_a, 2), id = _b[0], info = _b[1];
                        return postInfoToTableRowConfig(id, info);
                    })
                }), 2), refTableWrapper = _a[0], refTable_1 = _a[1];
                _b = __read(makeStacksTextInput("".concat(scriptName, "-search"), {
                    placeholder: "Post link or text to search for",
                    title: "Post Search",
                    classes: ["m0", "mt16"]
                }), 2), searchWrapper = _b[0], searchInput_1 = _b[1];
                storage = Store.locateStorage();
                store = new Store.default(scriptName, storage);
                seAPIkeyKey = "se-api-key";
                return [4, store.load(seAPIkeyKey, "")];
            case 4:
                key_1 = _c.sent();
                return [4, store.save(seAPIkeyKey, key_1)];
            case 5:
                _c.sent();
                apiPostCache_1 = new Map();
                searchInput_1.addEventListener("input", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var value, id, postRow, post, _a, body, link, post_type, score, owner, _b, cells, data, rows, rows_1, rows_1_1, row, body;
                    var e_1, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                value = searchInput_1.value;
                                if (!isPostLink(value)) return [3, 2];
                                id = getQuestionId(value) || getAnswerId(value);
                                if (!id)
                                    return [2];
                                if (apiPostCache_1.get(id)) {
                                    postRow = refTable_1.querySelector("[data-id=".concat(id, "]"));
                                    if (postRow)
                                        postRow.hidden = false;
                                    return [2];
                                }
                                return [4, getPost(id, {
                                        site: getAPIsite(value),
                                        filter: "7W_5I0m30",
                                        key: key_1
                                    })];
                            case 1:
                                post = _d.sent();
                                if (!post)
                                    return [2];
                                apiPostCache_1.set(id, post);
                                _a = post.body, body = _a === void 0 ? "" : _a, link = post.link, post_type = post.post_type, score = post.score, owner = post.owner;
                                _b = postInfoToTableRowConfig(id, {
                                    body: body,
                                    id: id,
                                    link: link,
                                    authorLink: owner === null || owner === void 0 ? void 0 : owner.link,
                                    authorName: owner === null || owner === void 0 ? void 0 : owner.display_name,
                                    type: post_type,
                                    votes: score.toString()
                                }), cells = _b.cells, data = _b.data;
                                refTable_1.tBodies[0].append(makeStacksTableRow(cells, data));
                                return [2];
                            case 2:
                                rows = refTable_1.rows;
                                try {
                                    for (rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                                        row = rows_1_1.value;
                                        if (row === rows[0])
                                            continue;
                                        if (!value) {
                                            row.hidden = false;
                                            continue;
                                        }
                                        body = row.dataset.body;
                                        row.hidden = !(body === null || body === void 0 ? void 0 : body.toLowerCase().includes(value.toLowerCase()));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (rows_1_1 && !rows_1_1.done && (_c = rows_1.return)) _c.call(rows_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                return [2];
                        }
                    });
                }); });
                configForm.append(refTableWrapper, searchWrapper);
                _c.label = 6;
            case 6:
                document.body.append(configModal);
                refBtn = makeEditorButton("".concat(scriptName, "-reference"), "iconMergeSm", "M5.45 3H1v2h3.55l3.6 4-3.6 4H1v2h4.45l4.5-5H13v3l4-4-4-4v3H9.95l-4.5-5Z", "Reference a post", function () { return Stacks.showModal(configModal); });
                snippetBtn.after(refBtn);
                document.addEventListener("".concat(scriptName, "-close-config"), function () { return Stacks.hideModal(configModal); });
                appendStyles();
                return [2];
        }
    });
}); }, { once: true });
