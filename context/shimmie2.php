<?php
function send_event(Event $event) {
    global $_event_listeners;
    ctx_log_start(get_class($event));          // log which event is being broadcast
    foreach($_event_listeners as $listener) {
        ctx_log_start(get_class($listener));   // log which extension is handling the event
        $listener->receive_event($event);
        ctx_log_endok();
    }
    ctx_log_endok();
}
