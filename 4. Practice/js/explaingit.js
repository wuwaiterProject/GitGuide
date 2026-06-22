define(['historyview', 'controlbox', 'stagingview', 'd3'], function (HistoryView, ControlBox, StagingView, d3) {
    var prefix = 'ExplainGit',
        openSandBoxes = [],
        open,
        reset,
        explainGit;

    open = function (_args) {
        var args = Object.create(_args),
            name = prefix + args.name,
            containerId = name + '-Container',
            container = d3.select('#' + containerId),
            playground = container.select('.playground-container'),
            historyView, originView = null,
            stagingView = null,
            controlBox;

        container.style('display', 'block');

        if (args.staging || args.files) {
            container.classed('has-staging', true);
        }

        args.name = name;
        historyView = new HistoryView(args);

        if (args.originData) {
            originView = new HistoryView({
                name: name + '-Origin',
                width: 300,
                height: 225,
                commitRadius: 15,
                remoteName: 'origin',
                commitData: args.originData
            });

            originView.render(playground);
        }

        if (args.staging || args.files) {
            stagingView = new StagingView({ files: args.files || [] });
            stagingView.render(playground);
        }

        controlBox = new ControlBox({
            historyView: historyView,
            originView: originView,
            stagingView: stagingView,
            initialMessage: args.initialMessage
        });

        controlBox.render(playground);
        historyView.render(playground);

        openSandBoxes.push({
            hv: historyView,
            cb: controlBox,
            sv: stagingView,
            container: container
        });
    };

    reset = function () {
        for (var i = 0; i < openSandBoxes.length; i++) {
            var osb = openSandBoxes[i];
            osb.hv.destroy();
            osb.cb.destroy();
            if (osb.sv) {
                osb.sv.destroy();
            }
            osb.container.classed('has-staging', false);
            osb.container.style('display', 'none');
        }

        openSandBoxes.length = 0;
        d3.selectAll('a.openswitch').classed('selected', false);
    };

    explainGit = {
        HistoryView: HistoryView,
        ControlBox: ControlBox,
        StagingView: StagingView,
        generateId: HistoryView.generateId,
        open: open,
        reset: reset
    };

    window.explainGit = explainGit;

    return explainGit;
});
