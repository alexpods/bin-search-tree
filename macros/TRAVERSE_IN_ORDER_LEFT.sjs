macro TRAVERSE_IN_ORDER_LEFT {
    rule {($min:expr, $length:expr, ($node:ident) => { $callback... })} => {
        var min   = $min;
        var $node = min;
        var stack = new Array(50);
        var index = 0;

        do {
            $callback...

            while ($node['r']) {
                $node = $node['r'];

                while ($node['l']) {
                    stack[index++] = $node;
                    $node = $node['l'];
                }

                $callback...
            }
        } while ($node = (index ? stack[--index] : min = min['p']));
    }
}
export TRAVERSE_IN_ORDER_LEFT