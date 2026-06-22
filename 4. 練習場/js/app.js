require(['explaingit', 'examples'], function (explainGit, examples) {
    'use strict';

    var select = document.getElementById('mode-select');
    var description = document.getElementById('mode-description');
    var defaultHash = 'add';

    function setDescription(example) {
        if (!example || !example.description) {
            description.innerHTML = '';
            return;
        }
        description.innerHTML = example.description;
    }

    function openMode(mode) {
        var example = examples[mode];
        if (!example) {
            return;
        }

        explainGit.reset();
        setDescription(example);

        if (select && select.value !== mode) {
            select.value = mode;
        }

        explainGit.open(example);
    }

    function openFromHash() {
        var hash = window.location.hash.substr(1) || defaultHash;
        if (!examples[hash]) {
            hash = defaultHash;
            window.location.hash = hash;
            return;
        }
        openMode(hash);
    }

    if (select) {
        Object.keys(examples).forEach(function (key) {
            var option = document.createElement('option');
            option.value = key;
            option.textContent = examples[key].label;
            select.appendChild(option);
        });

        select.addEventListener('change', function () {
            if (this.value) {
                window.location.hash = this.value;
            }
        });
    }

    window.addEventListener('hashchange', openFromHash, false);
    window.addEventListener('load', openFromHash, false);
});
