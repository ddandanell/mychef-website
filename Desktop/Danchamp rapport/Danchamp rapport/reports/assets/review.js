(function () {
  const STORAGE_KEY = "danchamp-review-data-v1";
  const reportId = document.body.dataset.reportId || "default-report";
  const reportTitle = document.body.dataset.reportTitle || document.title;
  let pendingLoadWarning = null;

  function emptyStore() {
    return {
      version: 1,
      updatedAt: null,
      reports: {}
    };
  }

  function showMessage(message, kind) {
    const banner = document.createElement("div");
    banner.className = "flash-banner flash-" + (kind || "info");
    banner.textContent = message;
    document.body.appendChild(banner);
    window.setTimeout(() => banner.remove(), 4500);
  }

  function normalizeComment(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return null;
    }
    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    const type = typeof raw.type === "string" ? raw.type.trim() : "question";
    const status = typeof raw.status === "string" ? raw.status.trim() : "open";
    const note = typeof raw.note === "string" ? raw.note.trim() : "";
    const sectionTitle =
      typeof raw.sectionTitle === "string" ? raw.sectionTitle.trim() : "";
    const createdAt =
      typeof raw.createdAt === "string" ? raw.createdAt : new Date().toISOString();

    if (!name || !note) {
      return null;
    }

    return { name, type, status, note, sectionTitle, createdAt };
  }

  function normalizeStore(raw) {
    const store = emptyStore();
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return store;
    }

    store.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : null;

    if (!raw.reports || typeof raw.reports !== "object" || Array.isArray(raw.reports)) {
      return store;
    }

    Object.entries(raw.reports).forEach(([rawReportId, rawReport]) => {
      if (!rawReport || typeof rawReport !== "object" || Array.isArray(rawReport)) {
        return;
      }

      const report = {
        title:
          typeof rawReport.title === "string" && rawReport.title.trim()
            ? rawReport.title.trim()
            : rawReportId,
        sections: {}
      };

      const sections = rawReport.sections;
      if (!sections || typeof sections !== "object" || Array.isArray(sections)) {
        store.reports[rawReportId] = report;
        return;
      }

      Object.entries(sections).forEach(([sectionId, rawComments]) => {
        if (!Array.isArray(rawComments)) {
          return;
        }

        const comments = rawComments
          .map(normalizeComment)
          .filter(Boolean);

        report.sections[sectionId] = comments;
      });

      store.reports[rawReportId] = report;
    });

    return store;
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return emptyStore();
      }
      return normalizeStore(JSON.parse(raw));
    } catch (error) {
      pendingLoadWarning =
        "Saved review notes could not be read. The local note store was reset in memory. Import a backup JSON if you need to recover them.";
      return emptyStore();
    }
  }

  function saveStore(store) {
    try {
      store.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return true;
    } catch (error) {
      showMessage(
        "Could not save notes in this browser. Check storage permissions or export your notes after retrying.",
        "error"
      );
      return false;
    }
  }

  function ensureReport(store) {
    if (!store.reports[reportId]) {
      store.reports[reportId] = {
        title: reportTitle,
        sections: {}
      };
    }
    return store.reports[reportId];
  }

  function getSectionComments(store, sectionId) {
    const report = ensureReport(store);
    if (!report.sections[sectionId]) {
      report.sections[sectionId] = [];
    }
    return report.sections[sectionId];
  }

  function badge(label, className) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = label;
    return span;
  }

  function formatDate(value) {
    try {
      return new Date(value).toLocaleString();
    } catch (error) {
      return value;
    }
  }

  function renderCommentList(container, comments) {
    container.innerHTML = "";
    if (!comments.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state small";
      empty.textContent = "No notes yet for this section.";
      container.appendChild(empty);
      return;
    }

    comments
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((comment) => {
        const item = document.createElement("article");
        item.className = "comment-item";

        const meta = document.createElement("div");
        meta.className = "comment-meta";
        meta.append(
          document.createTextNode(comment.name + " "),
          badge(comment.type, "comment-type"),
          badge(comment.status, "comment-status"),
          document.createTextNode(formatDate(comment.createdAt))
        );

        const body = document.createElement("div");
        body.textContent = comment.note;

        item.append(meta, body);
        container.appendChild(item);
      });
  }

  function renderReviewLog() {
    const target = document.querySelector("[data-review-log]");
    if (!target) {
      return;
    }

    const store = loadStore();
    const report = ensureReport(store);
    const entries = Object.entries(report.sections)
      .flatMap(([sectionId, comments]) =>
        comments.map((comment) => ({
          ...comment,
          sectionId,
          sectionTitle: comment.sectionTitle || sectionId
        }))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    target.innerHTML = "";
    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Review log is empty. Add a section note to start the discussion trail.";
      target.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = "review-log-list";

    entries.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "comment-item";

      const meta = document.createElement("div");
      meta.className = "comment-meta";

      const link = document.createElement("a");
      link.href = "#" + entry.sectionId;
      link.textContent = entry.sectionTitle;

      meta.append(
        link,
        document.createTextNode(" "),
        badge(entry.type, "comment-type"),
        badge(entry.status, "comment-status"),
        document.createTextNode(entry.name + " | " + formatDate(entry.createdAt))
      );

      const body = document.createElement("div");
      body.textContent = entry.note;

      card.append(meta, body);
      list.appendChild(card);
    });

    target.appendChild(list);
  }

  function initThreads() {
    const threads = document.querySelectorAll("[data-comment-thread]");
    threads.forEach((thread) => {
      const sectionId = thread.dataset.sectionId;
      const sectionTitle = thread.dataset.sectionTitle || sectionId;

      const title = document.createElement("h4");
      title.textContent = "Section notes";

      const helper = document.createElement("p");
      helper.className = "small muted";
      helper.textContent =
        "Notes save in your browser for this report bundle. Export JSON to share or archive review input.";

      const list = document.createElement("div");
      list.className = "comment-list";

      const form = document.createElement("form");
      form.className = "comment-form";
      form.innerHTML = [
        '<div class="form-row">',
        '<input name="name" placeholder="Reviewer name" required />',
        '<select name="type"><option value="question">question</option><option value="edit">edit</option><option value="concern">concern</option><option value="idea">idea</option><option value="decision">decision</option></select>',
        '<select name="status"><option value="open">open</option><option value="needs review">needs review</option><option value="resolved">resolved</option></select>',
        "</div>",
        '<textarea name="note" placeholder="Add a section-specific note, challenge, requested change, or decision." required></textarea>',
        '<div><button class="btn" type="submit">Save note</button></div>'
      ].join("");

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const store = loadStore();
        const comments = getSectionComments(store, sectionId);
        comments.push({
          name: String(data.get("name")).trim(),
          type: String(data.get("type")).trim(),
          status: String(data.get("status")).trim(),
          note: String(data.get("note")).trim(),
          sectionTitle,
          createdAt: new Date().toISOString()
        });
        if (!saveStore(store)) {
          comments.pop();
          return;
        }
        renderCommentList(list, comments);
        renderReviewLog();
        form.reset();
        showMessage("Note saved locally for this report bundle.", "ok");
      });

      thread.append(title, helper, list, form);
      const store = loadStore();
      renderCommentList(list, getSectionComments(store, sectionId));
    });
  }

  function exportNotes() {
    const store = loadStore();
    const blob = new Blob([JSON.stringify(store, null, 2)], {
      type: "application/json"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "danchamp-review-notes.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    showMessage("Notes exported as JSON.", "ok");
  }

  function mergeStores(current, incoming) {
    const merged = normalizeStore(current);

    Object.entries(incoming.reports).forEach(([incomingReportId, incomingReport]) => {
      if (!merged.reports[incomingReportId]) {
        merged.reports[incomingReportId] = {
          title: incomingReport.title,
          sections: {}
        };
      }

      const targetReport = merged.reports[incomingReportId];
      targetReport.title = targetReport.title || incomingReport.title;

      Object.entries(incomingReport.sections).forEach(([sectionId, incomingComments]) => {
        if (!targetReport.sections[sectionId]) {
          targetReport.sections[sectionId] = [];
        }

        const existingKeys = new Set(
          targetReport.sections[sectionId].map(
            (comment) =>
              [
                comment.name,
                comment.type,
                comment.status,
                comment.note,
                comment.createdAt
              ].join("|")
          )
        );

        incomingComments.forEach((comment) => {
          const key = [
            comment.name,
            comment.type,
            comment.status,
            comment.note,
            comment.createdAt
          ].join("|");

          if (!existingKeys.has(key)) {
            targetReport.sections[sectionId].push(comment);
            existingKeys.add(key);
          }
        });
      });
    });

    return merged;
  }

  function importNotes(file) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const incoming = normalizeStore(JSON.parse(String(reader.result)));
        if (!Object.keys(incoming.reports).length) {
          throw new Error("No report data found.");
        }
        const current = loadStore();
        const merged = mergeStores(current, incoming);
        if (!saveStore(merged)) {
          return;
        }
        showMessage("Imported notes were merged into the current local review store.", "ok");
        location.reload();
      } catch (error) {
        showMessage(
          "Could not import notes. Check that the file is valid JSON with a valid report structure.",
          "error"
        );
      }
    };
    reader.readAsText(file);
  }

  function initToolbar() {
    const exportButton = document.querySelector("[data-export-notes]");
    const importInput = document.querySelector("[data-import-notes]");
    const updated = document.querySelector("[data-last-updated]");

    if (exportButton) {
      exportButton.addEventListener("click", exportNotes);
    }

    if (importInput) {
      importInput.addEventListener("change", (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
          importNotes(file);
        }
      });
    }

    if (updated) {
      const store = loadStore();
      updated.textContent = store.updatedAt
        ? "Notes updated: " + formatDate(store.updatedAt)
        : "Notes updated: no local notes yet";
    }

    if (pendingLoadWarning) {
      showMessage(pendingLoadWarning, "error");
      pendingLoadWarning = null;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThreads();
    renderReviewLog();
    initToolbar();
  });
})();
