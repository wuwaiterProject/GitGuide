define(['d3'], function () {
    'use strict';

    /**
     * 工作目錄 + 暫存區視覺化
     * 檔案狀態: untracked | modified | staged
     */
    function StagingView(config) {
        this.files = {};
        this._initFiles(config.files || []);
    }

    StagingView.prototype._initFiles = function (specs) {
        var i, spec, name;
        this.files = {};
        for (i = 0; i < specs.length; i++) {
            spec = specs[i];
            name = spec.name;
            this.files[name] = {
                name: name,
                tracked: spec.status !== 'untracked',
                staged: spec.status === 'staged',
                modified: spec.status === 'modified' || spec.status === 'untracked',
                untracked: spec.status === 'untracked'
            };
            if (spec.status === 'staged') {
                this.files[name].modified = false;
            }
        }
    };

    StagingView.prototype.render = function (container) {
        var panel = container.append('div').classed('staging-panel', true);

        panel.append('div').classed('staging-title', true).text('檔案狀態');
        panel.append('div').classed('staging-section-label', true).text('工作目錄');
        this.workingBox = panel.append('div').classed('staging-box', true).classed('working-box', true);
        panel.append('div').classed('staging-section-label', true).text('暫存區 (Staging)');
        this.stagingBox = panel.append('div').classed('staging-box', true).classed('index-box', true);

        panel.append('div').classed('staging-hint', true).html(
            '模擬改檔: <code>edit [檔名]</code> · 新檔案: <code>touch [檔名]</code>'
        );

        this.container = panel;
        this.refresh();
    };

    StagingView.prototype.destroy = function () {
        if (this.container) {
            this.container.remove();
        }
    };

    StagingView.prototype._workingEntries = function () {
        var name, f, list = [];
        for (name in this.files) {
            if (!this.files.hasOwnProperty(name)) continue;
            f = this.files[name];
            if (f.staged) continue;
            if (f.untracked || f.modified) {
                list.push(f);
            }
        }
        return list.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    };

    StagingView.prototype._stagedEntries = function () {
        var name, f, list = [];
        for (name in this.files) {
            if (!this.files.hasOwnProperty(name)) continue;
            f = this.files[name];
            if (f.staged) list.push(f);
        }
        return list.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    };

    StagingView.prototype.refresh = function () {
        var working = this._workingEntries();
        var staged = this._stagedEntries();
        var wBox = this.workingBox;
        var sBox = this.stagingBox;

        wBox.html('');
        sBox.html('');

        if (working.length === 0) {
            wBox.append('div').classed('file-empty', true).text('（無變更）');
        } else {
            wBox.selectAll('.file-row').data(working).enter()
                .append('div').classed('file-row', true)
                .html(function (d) {
                    var badge = d.untracked ? '??' : ' M';
                    var cls = d.untracked ? 'untracked' : 'modified';
                    return '<span class="file-badge ' + cls + '">' + badge + '</span>' +
                        '<span class="file-name">' + d.name + '</span>';
                });
        }

        if (staged.length === 0) {
            sBox.append('div').classed('file-empty', true).text('（尚無 staged 檔案）');
        } else {
            sBox.selectAll('.file-row').data(staged).enter()
                .append('div').classed('file-row', true)
                .html(function (d) {
                    return '<span class="file-badge staged"> A</span>' +
                        '<span class="file-name">' + d.name + '</span>';
                });
        }
    };

    StagingView.prototype.getFile = function (name) {
        return this.files[name] || null;
    };

    StagingView.prototype.touch = function (name) {
        if (!name || name.trim() === '') {
            throw new Error('請指定檔名，例如: touch new.txt');
        }
        if (this.files[name]) {
            throw new Error('檔案已存在: ' + name);
        }
        this.files[name] = {
            name: name,
            tracked: false,
            staged: false,
            modified: true,
            untracked: true
        };
        this.refresh();
    };

    StagingView.prototype.edit = function (name) {
        var f;
        if (!name || name.trim() === '') {
            throw new Error('請指定檔名，例如: edit readme.md');
        }
        f = this.files[name];
        if (!f) {
            throw new Error('找不到檔案: ' + name + '（新檔請用 touch）');
        }
        if (f.staged) {
            f.staged = false;
            f.modified = true;
        } else {
            f.modified = true;
            f.untracked = !f.tracked;
        }
        this.refresh();
    };

    StagingView.prototype.add = function (name) {
        var f;
        if (!name || name.trim() === '') {
            throw new Error('請指定檔名，例如: git add readme.md');
        }
        f = this.files[name];
        if (!f) {
            throw new Error('找不到可加入的檔案: ' + name);
        }
        if (f.staged) {
            throw new Error('檔案已在暫存區: ' + name);
        }
        if (!f.modified && !f.untracked) {
            throw new Error('沒有需要 add 的變更: ' + name);
        }
        f.staged = true;
        f.modified = false;
        f.untracked = false;
        f.tracked = true;
        this.refresh();
        return name;
    };

    StagingView.prototype.addAll = function () {
        var name, f, count = 0;
        for (name in this.files) {
            if (!this.files.hasOwnProperty(name)) continue;
            f = this.files[name];
            if (!f.staged && (f.modified || f.untracked)) {
                f.staged = true;
                f.modified = false;
                f.untracked = false;
                f.tracked = true;
                count++;
            }
        }
        if (count === 0) {
            throw new Error('沒有可加入暫存區的變更。');
        }
        this.refresh();
        return count;
    };

    StagingView.prototype.unstage = function (name) {
        var f = this.files[name];
        if (!f || !f.staged) {
            throw new Error('檔案不在暫存區: ' + name);
        }
        f.staged = false;
        f.modified = true;
        this.refresh();
    };

    StagingView.prototype.hasStaged = function () {
        var name;
        for (name in this.files) {
            if (this.files.hasOwnProperty(name) && this.files[name].staged) {
                return true;
            }
        }
        return false;
    };

    StagingView.prototype.getStagedNames = function () {
        var name, list = [];
        for (name in this.files) {
            if (this.files.hasOwnProperty(name) && this.files[name].staged) {
                list.push(name);
            }
        }
        return list;
    };

    StagingView.prototype.afterCommit = function () {
        var name, f;
        for (name in this.files) {
            if (!this.files.hasOwnProperty(name)) continue;
            f = this.files[name];
            if (f.staged) {
                f.staged = false;
                f.modified = false;
                f.untracked = false;
                f.tracked = true;
            }
        }
        this.refresh();
    };

    StagingView.prototype.getStatusText = function () {
        var lines = ['On branch master', ''],
            working = this._workingEntries(),
            staged = this._stagedEntries(),
            i;

        if (staged.length > 0) {
            lines.push('Changes to be committed:');
            lines.push('  (use "git reset HEAD &lt;file&gt;..." to unstage)');
            lines.push('');
            for (i = 0; i < staged.length; i++) {
                lines.push('        modified:   ' + staged[i].name);
            }
            lines.push('');
        }

        if (working.length > 0) {
            var modified = [];
            var untracked = [];
            for (i = 0; i < working.length; i++) {
                if (working[i].untracked) {
                    untracked.push(working[i]);
                } else {
                    modified.push(working[i]);
                }
            }

            if (modified.length > 0) {
                lines.push('Changes not staged for commit:');
                lines.push('  (use "git add &lt;file&gt;..." to stage)');
                lines.push('');
                for (i = 0; i < modified.length; i++) {
                    lines.push('        modified:   ' + modified[i].name);
                }
                lines.push('');
            }

            if (untracked.length > 0) {
                lines.push('Untracked files:');
                lines.push('  (use "git add &lt;file&gt;..." to include in what will be committed)');
                lines.push('');
                for (i = 0; i < untracked.length; i++) {
                    lines.push('        ' + untracked[i].name);
                }
                lines.push('');
            }
        }

        if (staged.length === 0 && working.length === 0) {
            lines.push('nothing to commit, working tree clean');
        }

        return lines.join('<br>');
    };

    return StagingView;
});
