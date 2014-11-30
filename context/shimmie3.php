<?php
function get_active_bans() {
    global $database;

    $cached = $database->cache->get("ip_bans");
    if($cached) return $cached;

    $bans = $database->get_all("
        SELECT bans.*, users.name as banner_name
        FROM bans
        JOIN users ON banner_id = users.id
        WHERE (end_timestamp > :end_timestamp) OR (end_timestamp IS NULL)
        ORDER BY end_timestamp, bans.id
    ", array("end_timestamp"=>time()));

    $database->cache->set("ip_bans", $bans);
    return $bans;
}
