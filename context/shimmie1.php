<?php
require_once "lib/context.php";
ctx_set_log("shimmie.ctxt");

try {
    // log the requested page, and make it a bookmark
    ctx_log_start($_SERVER["REQUEST_URI"], true);

    /*
     * 150 lines of code cut out here for brevity
     */

    $database->db->commit()
    ctx_log_endok();  // if all went well, just log "event complete"
}
catch(Exception $e) {
    print_error($e);
    $database->db->rollback();
    ctx_log_ender($e->getMessage());  // if there's an error, log what it was
}
