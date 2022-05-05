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
// @version         2.0.0
// ==/UserScript==

"use strict";
window.addEventListener("load", async () => {
    const scriptName = "magic-answer-references";
    const API_BASE = "https://api.stackexchange.com";
    const API_VER = 2.3;
    const waitForSelector = (selector, context = document) => {
        return new Promise((resolve) => {
            const foundAtInitTime = context.querySelector(selector);
            if (foundAtInitTime)
                resolve(foundAtInitTime);
            const mo = new MutationObserver(() => {
                const foundAtObserveTime = context.querySelector(selector);
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
    const makeStacksIcon = (name, pathConfig, namespace = "http://www.w3.org/2000/svg") => {
        const svg = document.createElementNS(namespace, "svg");
        svg.classList.add("svg-icon", name);
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "18");
        svg.setAttribute("viewBox", "0 0 18 18");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS(namespace, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return svg;
    };
    const makeDraggable = (id) => {
        document.addEventListener("dragstart", ({ dataTransfer }) => {
            const dummy = document.createElement("img");
            dummy.src = "data:image/png;base64,AAAAAA==";
            dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
        });
        let previousX = 0;
        let previousY = 0;
        let zeroed = 0;
        let isDragging = false;
        const handleCoordChange = ({ clientX, clientY }) => {
            const modal = document.getElementById(id);
            if (!modal)
                return;
            previousX || (previousX = clientX);
            previousY || (previousY = clientY);
            let { style: { top, left }, } = modal;
            if (!top && !left) {
                const computed = window.getComputedStyle(modal);
                top = computed.top;
                left = computed.left;
            }
            const moveX = clientX - previousX;
            const moveY = clientY - previousY;
            const superSonic = 500;
            if ([moveX, moveY].map(Math.abs).some((c) => c > superSonic))
                return;
            const { style } = modal;
            style.left = `${parseInt(left) + moveX}px`;
            style.top = `${parseInt(top) + moveY}px`;
            previousX = clientX;
            previousY = clientY;
        };
        document.addEventListener("dragstart", (event) => {
            const { target } = event;
            if (target === document.getElementById(id))
                isDragging = true;
        });
        document.addEventListener("dragend", ({ target }) => {
            if (target === document.getElementById(id)) {
                isDragging = false;
                previousX = 0;
                previousY = 0;
            }
        });
        document.addEventListener("drag", (event) => {
            zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;
            if (zeroed >= 3 || !isDragging)
                return;
            return handleCoordChange(event);
        });
        document.addEventListener("dragover", (e) => {
            if (isDragging)
                e.preventDefault();
            if (zeroed < 3 || !isDragging)
                return;
            return handleCoordChange(e);
        });
    };
    const makeStacksModal = (id, header, options) => {
        const { minWidth } = options;
        const ariaLabelId = "modal-title";
        const ariaDescrId = "modal-description";
        const wrap = document.createElement("aside");
        wrap.classList.add("s-modal");
        wrap.id = id;
        wrap.tabIndex = -1;
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-labelledby", ariaLabelId);
        wrap.setAttribute("aria-describeddy", ariaDescrId);
        wrap.setAttribute("aria-hidden", "true");
        const { dataset } = wrap;
        dataset.sModalTarget = "modal";
        dataset.controller = "s-modal";
        const doc = document.createElement("div");
        doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", `wmn${minWidth}`);
        doc.setAttribute("role", "document");
        doc.id = `${id}-document`;
        doc.draggable = true;
        const title = document.createElement("h1");
        title.classList.add("s-modal--header");
        title.id = ariaLabelId;
        title.textContent = header;
        const form = document.createElement("form");
        form.classList.add("s-modal--body", "d-flex", "fd-column", "flex__allcells6", "fw-wrap", "gs16");
        const close = document.createElement("button");
        close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
        close.type = "button";
        close.dataset.action = "s-modal#hide";
        const closeIcon = makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z");
        makeDraggable(doc.id);
        close.append(closeIcon);
        doc.append(title, form, close);
        wrap.append(doc);
        return wrap;
    };
    const makeStacksTableRow = (cells, data) => {
        const row = document.createElement("tr");
        Object.assign(row.dataset, data || {});
        row.append(...cells.map((content) => {
            const td = document.createElement("td");
            td.append(content);
            return td;
        }));
        return row;
    };
    const makeStacksTable = (id, options) => {
        const { classes = [], headers, rows = [] } = options;
        const wrapper = document.createElement("div");
        wrapper.classList.add("s-table-container", ...classes);
        const table = document.createElement("table");
        table.classList.add("s-table");
        table.id = id;
        const head = document.createElement("thead");
        const headRow = document.createElement("tr");
        headRow.append(...headers.map((hdr) => {
            const th = document.createElement("th");
            th.scope = "col";
            th.append(hdr);
            return th;
        }));
        const body = document.createElement("tbody");
        body.append(...rows.map(({ cells, data }) => {
            return makeStacksTableRow(cells, data);
        }));
        head.append(headRow);
        table.append(head, body);
        wrapper.append(table);
        return [wrapper, table];
    };
    const makeStacksTextInput = (id, options = {}) => {
        const { classes = [], placeholder = "", title = "", value = "", } = options;
        const wrap = document.createElement("div");
        wrap.classList.add("d-flex", "gs4", "gsy", "fd-column", ...classes);
        const inputWrap = document.createElement("div");
        inputWrap.classList.add("d-flex", "ps-relative");
        const input = document.createElement("input");
        input.classList.add("s-input");
        input.id = id;
        input.type = "text";
        input.placeholder = placeholder;
        input.value = value;
        inputWrap.append(input);
        wrap.append(inputWrap);
        if (title) {
            const lblWrap = document.createElement("div");
            lblWrap.classList.add("flex--item");
            const label = document.createElement("label");
            label.classList.add("d-block", "s-label");
            label.htmlFor = id;
            label.textContent = title;
            lblWrap.append(label);
            wrap.prepend(lblWrap);
            return [wrap, input, label];
        }
        return [wrap, input];
    };
    const makeAnchor = (url, title) => {
        const a = document.createElement("a");
        a.href = url;
        a.title = a.textContent = title;
        a.target = "_blank";
        return a;
    };
    const appendStyles = () => {
        const style = document.createElement("style");
        document.head.append(style);
        const { sheet } = style;
        if (!sheet)
            return;
        const rules = [
            `.${scriptName}.wmd-button > .svg-icon {
                margin-top: 2px;
                color: var(--black-600);
            }`,
            `.${scriptName}.wmd-button > .svg-icon:hover {
                color: var(--black-900);
            }`,
            `.${scriptName}.s-table-container td:first-child {
                cursor: pointer;
            }`,
            `.${scriptName}.s-table-container thead {
                position: sticky;
                top: -1px;
                z-index: 9999;
            }`,
            `.s-table td {
                border-bottom: 1px solid var(--bc-medium);
            }`
        ];
        rules.forEach((rule) => sheet.insertRule(rule));
    };
    const makeStacksButton = (id, text, { classes = [], title, danger = false, loading = false, muted = false, primary = false, type = "filled", } = {}) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
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
    const makeEditorButton = (id, iconName, path, title, action) => {
        const wrapper = document.createElement("li");
        wrapper.classList.add("wmd-button", scriptName);
        wrapper.id = id;
        wrapper.title = title;
        wrapper.append(makeStacksIcon(iconName, path));
        wrapper.addEventListener("click", action);
        return wrapper;
    };
    const scrapePost = (container, type) => {
        var _a, _b, _c, _d;
        const voteCell = container.querySelector(".js-vote-count");
        const votes = ((_a = voteCell === null || voteCell === void 0 ? void 0 : voteCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "0";
        const { dataset: { answerid, questionid } } = container;
        const id = type === "answer" ? answerid : questionid;
        if (!id) {
            console.debug(`[${scriptName}] post is missing an id`);
            return;
        }
        const bodyElem = container.querySelector(".js-post-body");
        const body = ((_b = bodyElem === null || bodyElem === void 0 ? void 0 : bodyElem.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        const link = `${location.origin}/${type === "answer" ? "a" : "q"}/${id}`;
        const info = { body, container, id, link, type, votes };
        const authorLink = container.querySelector("[itemprop=author] a");
        if (authorLink) {
            info.authorLink = authorLink.href;
            info.authorName = (_c = authorLink.textContent) === null || _c === void 0 ? void 0 : _c.trim();
        }
        if (!authorLink) {
            const nameElement = container.querySelector("[itemprop=name]");
            info.authorName = (_d = nameElement === null || nameElement === void 0 ? void 0 : nameElement.textContent) === null || _d === void 0 ? void 0 : _d.trim();
        }
        return info;
    };
    const scrapePostsOnPage = () => {
        const posts = new Map();
        const answers = document.querySelectorAll(".answer");
        answers.forEach((container) => {
            const info = scrapePost(container, "answer");
            if (info)
                posts.set(info.id, info);
        });
        const questions = document.querySelectorAll(".question");
        questions.forEach((container) => {
            const info = scrapePost(container, "question");
            if (info)
                posts.set(info.id, info);
        });
        return posts;
    };
    const insertPostReference = (input, info) => {
        const { selectionStart, selectionEnd, value } = input;
        const isCollapsed = selectionStart === selectionEnd;
        const { authorLink, authorName, link, type } = info;
        const before = value.slice(0, selectionStart + 1);
        const after = value.slice(selectionEnd - 1);
        const authorRef = authorLink ? `[${authorName}](${authorLink})` : authorName;
        const postRef = `${authorRef ? `${authorRef}'s ` : ""}[${type}](${link})`;
        input.value = isCollapsed ? value + postRef : before + postRef + after;
        input.dispatchEvent(new Event("input"));
        document.dispatchEvent(new CustomEvent(`${scriptName}-close-config`));
    };
    const getQuestionId = (text) => {
        const [, id] = /^https:.+?\/q(?:uestions)?\/(\d+)(?:\/?\d*?$)/.exec(text) || [];
        return id;
    };
    const getAnswerId = (text) => {
        const [, g1, g2] = /^https:.+?\/(?:a\/(\d+)(?:\/?\d*?$)|questions\/.+?\/(\d+))/.exec(text) || [];
        return g1 || g2;
    };
    const postLinkExpr = new RegExp("^https:.+?\\/(?:q(?:uestions)?|a)\\/\\d+(?:\\/|$)");
    const isPostLink = (text) => postLinkExpr.test(text);
    const getAPIsite = (text) => {
        const [, hostname] = /^https:.+?\/([^\/]+)\//.exec(text) || [];
        const normalized = hostname.split(".").slice(0, -1).join(".");
        return normalized !== "meta.stackexchange" ?
            normalized.replace(".stackexchange", "") :
            normalized;
    };
    const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
    const getPost = async (id, { site = "stackoverflow", ...rest }) => {
        const url = new URL(`${API_BASE}/${API_VER}/posts/${id}`);
        url.search = new URLSearchParams({ site, ...rest }).toString();
        const res = await fetch(url.toString());
        if (!res.ok)
            return;
        const { items = [], backoff } = await res.json();
        if (backoff) {
            await delay(backoff * 1e3);
            return getPost(id, { site, ...rest });
        }
        return items[0];
    };
    const actionBtnConfig = {
        classes: ["s-btn__xs", "w100"],
        type: "outlined",
        muted: true
    };
    const postInfoToTableRowConfig = (id, info) => {
        const { authorName, authorLink, body, container, type, votes } = info;
        const author = authorLink && authorName ?
            makeAnchor(authorLink, authorName) :
            authorName || "";
        const postType = document.createElement("span");
        postType.textContent = type;
        postType.addEventListener("click", () => {
            if (!container)
                return;
            const { scrollX, scrollY } = window;
            const { top, left } = container.getBoundingClientRect();
            window.scrollTo(left + scrollX, top + scrollY);
        });
        const actionBtn = makeStacksButton(`${scriptName}-ref-${id}`, "ref", actionBtnConfig);
        actionBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            insertPostReference(postTextInput, info);
        });
        return {
            cells: [postType, author, votes, actionBtn],
            data: { body, id }
        };
    };
    const editor = document.getElementById("post-editor");
    if (!editor) {
        console.debug(`[${scriptName}] missing post editor`);
        return;
    }
    const menu = await waitForSelector("#wmd-button-row");
    if (!menu) {
        console.debug(`[${scriptName}] missing editor menu`);
        return;
    }
    const snippetBtn = await waitForSelector("#wmd-snippet-button");
    if (!snippetBtn) {
        console.debug(`[${scriptName}] missing editor snippet button`);
        return;
    }
    const postTextInput = await waitForSelector("#wmd-input");
    if (!postTextInput) {
        console.debug(`[${scriptName}] missing editor input`);
        return;
    }
    const configModal = makeStacksModal(`${scriptName}-config`, "Reference a Post", { minWidth: 25 });
    const configForm = configModal.querySelector("form");
    if (configForm) {
        const posts = scrapePostsOnPage();
        const [refTableWrapper, refTable] = makeStacksTable(`${scriptName}-current-posts`, {
            classes: [scriptName, "hmx2"],
            headers: ["Type", "Author", "Score", "Actions"],
            rows: [...posts].map(([id, info]) => {
                return postInfoToTableRowConfig(id, info);
            })
        });
        const [searchWrapper, searchInput] = makeStacksTextInput(`${scriptName}-search`, {
            placeholder: "Post link or text to search for",
            title: "Post Search",
            classes: ["m0", "mt16"]
        });
        const storage = Store.locateStorage();
        const store = new Store.default(scriptName, storage);
        const seAPIkeyKey = "se-api-key";
        const key = await store.load(seAPIkeyKey, "");
        await store.save(seAPIkeyKey, key);
        const [apiKeyWrapper, apiKeyInput] = makeStacksTextInput(`${scriptName}-${seAPIkeyKey}`, {
            placeholder: "SE API key (advanced search)",
            title: "API Key",
            classes: ["m0", "mt16"],
            value: key
        });
        apiKeyInput.addEventListener("change", () => store.save(seAPIkeyKey, apiKeyInput.value));
        const apiPostCache = new Map();
        searchInput.addEventListener("input", async () => {
            const { value } = searchInput;
            if (isPostLink(value)) {
                const id = getQuestionId(value) || getAnswerId(value);
                if (!id)
                    return;
                if (apiPostCache.get(id)) {
                    const postRow = refTable.querySelector(`[data-id=${id}]`);
                    if (postRow)
                        postRow.hidden = false;
                    return;
                }
                const post = await getPost(id, {
                    site: getAPIsite(value),
                    filter: "7W_5I0m30",
                    key: await store.load(seAPIkeyKey, key)
                });
                if (!post)
                    return;
                apiPostCache.set(id, post);
                const { body = "", link, post_type, score, owner } = post;
                const { cells, data } = postInfoToTableRowConfig(id, {
                    body,
                    id,
                    link,
                    authorLink: owner === null || owner === void 0 ? void 0 : owner.link,
                    authorName: owner === null || owner === void 0 ? void 0 : owner.display_name,
                    type: post_type,
                    votes: score.toString()
                });
                refTable.tBodies[0].append(makeStacksTableRow(cells, data));
                return;
            }
            const { rows } = refTable;
            for (const row of rows) {
                if (row === rows[0])
                    continue;
                if (!value) {
                    row.hidden = false;
                    continue;
                }
                const { dataset: { body } } = row;
                row.hidden = !(body === null || body === void 0 ? void 0 : body.toLowerCase().includes(value.toLowerCase()));
            }
        });
        configForm.append(refTableWrapper, searchWrapper, apiKeyWrapper);
    }
    document.body.append(configModal);
    const refBtn = makeEditorButton(`${scriptName}-reference`, "iconMergeSm", "M5.45 3H1v2h3.55l3.6 4-3.6 4H1v2h4.45l4.5-5H13v3l4-4-4-4v3H9.95l-4.5-5Z", "Reference a post", () => Stacks.showModal(configModal));
    snippetBtn.after(refBtn);
    document.addEventListener(`${scriptName}-close-config`, () => Stacks.hideModal(configModal));
    appendStyles();
}, { once: true });
