<?php

	include 'parser.php';

    // Ugly php code next:
    $next24_allowed_block_list = [];
    add_filter( 'allowed_block_types', function ( $allowed_blocks ) {
        global $next24_allowed_block_list;
        $next24_allowed_block_list = $allowed_blocks;
        add_action ( 'admin_head', function () {
            global $next24_allowed_block_list;
            ?>
                <script type="text/javascript">
                    var NEXT24HR_ALLOWED_BLOCK_TYPES = <?php echo json_encode($next24_allowed_block_list); ?>
                </script>
            <?php }
        );
    }, 10000, 1);

