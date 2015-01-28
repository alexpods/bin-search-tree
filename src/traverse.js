exports.preOrderLeft = function(node, callback) {
    var stack = new Array(50);
    var index = 0;

    do {
        callback(node);

        if (node['l']) {
            node['r'] && (stack[index++] = node['r']);
            node = node['l'];
            continue;
        }
        if (node['r']) {
            node = node['r'];
            continue;
        }
        if (index) {
            node = stack[--index];
            continue;
        }
        break;

    } while (true);
};

exports.preOrderRight = function(node, callback) {
    var stack = new Array(50);
    var index = 0;

    do {
        callback(node);

        if (node['r']) {
            node['l'] && (stack[index++] = node['l']);
            node = node['r'];
            continue;
        }
        if (node['l']) {
            node = node['l'];
            continue;
        }
        if (index) {
            node = stack[--index];
            continue;
        }
        break;

    } while (true);
};

exports.inOrderLeft = function(node, callback) {
    var stack = new Array(50);
    var index = 0;

    main: do {
        if (node['l']) {
            stack[index++] = node;
            node = node['l'];
            continue;
        }

        callback(node);

        if (node['r']) {
            node = node['r'];
            continue;
        }

        while (index) {
            node = stack[--index];

            callback(node);

            if (node['r']) {
                node = node['r'];
                continue main;
            }
        }
        break;

    } while (true);
};

exports.inOrderRight = function(node, callback) {
    var stack = new Array(50);
    var index = 0;

    main: do {
        if (node['r']) {
            stack[index++] = node;
            node = node['r'];
            continue;
        }

        callback(node);

        if (node['l']) {
            node = node['l'];
            continue;
        }

        while (index) {
            node = stack[--index];

            callback(node);

            if (node['l']) {
                node = node['l'];
                continue main;
            }
        }
        break;

    } while (true);
};

exports.postOrderLeft = function(node, callback) {
    var stack = new Array(100);
    var index = 0;

    main: do {

        if (node['l']) {
            stack[index++] = { n: node, r: false };
            node['r'] && (stack[index++] = { n: node['r'], r: true });
            node = node['l'];
            continue;
        }
        if (node['r']) {
            stack[index++] = { n: node, r: false };
            node = node['r'];
            continue;
        }

        callback(node);

        while (index) {
            var nn = stack[--index];

            if (nn.r) {
                node = nn.n;
                continue main;
            }

            callback(nn.n);
        }
        break;

    } while (true);
};

exports.postOrderRight = function(node, callback) {
    var stack = new Array(100);
    var index = 0;

    main: do {
        if (node['r']) {
            stack[index++] = { n: node, l: false };
            node['l'] && (stack[index++] = { n: node['l'], l: true });
            node = node['r'];
            continue;
        }
        if (node['l']) {
            stack[index++] = { n: node, l: false };
            node = node['l'];
            continue;
        }

        callback(node);

        while (index) {
            var nn = stack[--index];

            if (nn.l) {
                node = nn.n;
                continue main;
            }

            callback(nn.n);
        }
        break;

    } while (true);
};

exports.levelOrderLeft = function(node, callback) {
    var queue = new Array(1000000);
    var start = 0;
    var end   = 0;

    do {
        callback(node);

        node['l'] && (queue[end++] = node['l']);
        node['r'] && (queue[end++] = node['r']);

        end > 1000000 && (end   = 0);

        if (start !== end) {
            node = queue[start++];
            start > 1000000 && (start = 0);
            continue;
        }
        break;

    } while (true);
};

exports.levelOrderRight = function(node, callback) {
    var queue = new Array(1000000);
    var start = 0;
    var end   = 0;

    do {
        callback(node);

        node['r'] && (queue[end++] = node['r']);
        node['l'] && (queue[end++] = node['l']);

        end > 1000000 && (end   = 0);

        if (start !== end) {
            node = queue[start++];
            start > 1000000 && (start = 0);
            continue;
        }
        break;

    } while (true);
};