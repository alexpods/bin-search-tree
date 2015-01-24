macro TRAVERSE_IN_ORDER_RIGHT {
    rule {($max:expr, $length:expr, ($node:ident) => { $callback... })} => {
        var max   = $max;
        var $node = max;
        var stack = new Array(50);
        var index = 0;

        do {
            $callback...

            while ($node['l']) {
                $node = $node['l'];

                while ($node['r']) {
                    stack[index++] = $node;
                    $node = $node['r'];
                }

                $callback...
            }
        } while ($node = (index ? stack[--index] : max = max['p']));
    }
}
export TRAVERSE_IN_ORDER_RIGHT;