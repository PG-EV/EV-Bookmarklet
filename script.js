javascript:(function () {
    try {
        var handled = false;
        var u = location.href;
        var h = location.hostname.toLowerCase();

        var O = function (x) {
            if (x) {
                handled = true;
                open(x, "_blank", "noopener,noreferrer");
            } else {
                alert("Error");
            } 
        };

        /* Google Maps */
        if (
            (
                /(^|\.)google\.com$/.test(h) &&
                /\/maps/.test(location.pathname)
            ) ||
            h === "maps.google.com"
        ) {
            var f = null;
            var mm = u.match(/!1s(ChIJ[a-zA-Z0-9\-_]{23})/);

            if (mm) {
                f = mm[1];
            }

            if (!f && window.APP_INITIALIZATION_STATE) {
                var ais = JSON.stringify(window.APP_INITIALIZATION_STATE);
                var am = ais.match(/ChIJ[a-zA-Z0-9\-_]{23}/);

                if (am) {
                    f = am[0];
                }
            }

            if (!f) {
                var scripts = document.querySelectorAll("script");

                for (var si = 0; si < scripts.length; si++) {
                    var sm = scripts[si].textContent.match(
                        /ChIJ[a-zA-Z0-9\-_]{23}/
                    );

                    if (sm) {
                        f = sm[0];
                        break;
                    }
                }
            }

            if (!f) {
                alert("No Place ID found.");
                return;
            }

            var gc = document.createElement("div");

            gc.style.cssText =
    "position:fixed;" +
    "top:20px;" +
    "left:50%;" +
    "transform:translateX(-50%);" +
    "z-index:2147483647;" +
    "background:#fff;" +
    "color:#333;" +
    "padding:15px;" +
    "border-radius:8px;" +
    "box-shadow:0 4px 15px rgba(0,0,0,0.2);" +
    "font-family:sans-serif;" +
    "border:1px solid #ddd;" +
    "display:flex;" +
    "flex-direction:column;" +
    "gap:10px;";

            gc.innerHTML =
                '<div style="font-weight:bold;font-size:14px;">' +
                    "Place ID Found:" +
                "</div>" +
                '<div style="' +
                    "background:#f4f4f4;" +
                    "padding:5px;" +
                    "border-radius:4px;" +
                    "font-family:monospace;" +
                    "border:1px solid #ccc;" +
                    "font-size:12px;" +
                '">' +
                    f +
                "</div>" +
                '<div style="display:flex;gap:5px;">' +
                    '<button id="cp" style="' +
                        "flex:1;" +
                        "cursor:pointer;" +
                        "padding:5px;" +
                        "background:#007bff;" +
                        "color:white;" +
                        "border:none;" +
                        "border-radius:4px;" +
                        "font-weight:bold;" +
                    '">' +
                        "Copy ID" +
                    "</button>" +
                    '<button id="cl" style="' +
                        "cursor:pointer;" +
                        "padding:5px;" +
                        "background:#6c757d;" +
                        "color:white;" +
                        "border:none;" +
                        "border-radius:4px;" +
                    '">' +
                        "Close" +
                    "</button>" +
                "</div>";

            document.body.appendChild(gc);

            gc.querySelector("#cp").onclick = function () {
                navigator.clipboard.writeText(f).then(function () {
                    var b = gc.querySelector("#cp");

                    b.innerText = "Copied!";
                    b.style.background = "#28a745";
                    b.style.color = "#fff";

                    setTimeout(function () {
                        if (gc.parentElement) {
                            document.body.removeChild(gc);
                        }
                    }, 800);
                });
            };

            gc.querySelector("#cl").onclick = function () {
                if (gc.parentElement) {
                    document.body.removeChild(gc);
                }
            };

            return;
        }

        /* Yelp */
        if (/(^|\.)yelp\.com$/.test(h)) {
            try {
                var mt = document.querySelector('meta[name="yelp-biz-id"]');
                var bid = mt ? mt.content : null;

                if (!bid) {
                    var hs = document.documentElement.innerHTML;
                    var ym = hs.match(/"businessId":"([^"]+)"/);

                    bid = ym ? ym[1] : null;
                }

                if (bid) {
                    var bu = "https://www.yelp.com/biz/" + bid;
                    var yd = document.createElement("div");

                    var bs =
                        "padding:10px 15px;" +
                        "font-size:14px;" +
                        "cursor:pointer;" +
                        "background:#d32323;" +
                        "color:#fff;" +
                        "border:none;" +
                        "border-radius:4px;" +
                        "margin-top:5px;" +
                        "font-weight:bold;";

                    yd.style =
                        "position:fixed;" +
                        "top:50px;" +
                        "left:50%;" +
                        "transform:translateX(-50%);" +
                        "background:#fff;" +
                        "border:1px solid #ccc;" +
                        "padding:25px;" +
                        "z-index:999999;" +
                        "box-shadow:0 10px 25px rgba(0,0,0,0.5);" +
                        "font-family:Arial;" +
                        "border-radius:12px;" +
                        "min-width:320px;" +
                        "text-align:center;";

                    yd.innerHTML =
                        '<h3 style="margin:0 0 15px;color:#d32323;font-size:18px;">' +
                            "Yelp Business ID" +
                        "</h3>" +
                        '<div style="margin-bottom:20px;">' +
                            '<code style="' +
                                "display:block;" +
                                "background:#f4f4f4;" +
                                "padding:10px;" +
                                "margin-bottom:8px;" +
                                "border-radius:4px;" +
                                "word-break:break-all;" +
                            '">' +
                                bid +
                            "</code>" +
                            '<button id="yid" style="' + bs + 'width:100%;">' +
                                "COPY ID" +
                            "</button>" +
                        "</div>" +
                        '<div style="margin-bottom:10px;">' +
                            '<p style="' +
                                "margin:0 0 8px;" +
                                "font-size:12px;" +
                                "color:#666;" +
                                "text-align:left;" +
                            '">' +
                                "Constructed URL:" +
                            "</p>" +
                            '<code style="' +
                                "display:block;" +
                                "background:#f4f4f4;" +
                                "padding:10px;" +
                                "margin-bottom:8px;" +
                                "border-radius:4px;" +
                                "word-break:break-all;" +
                                "font-size:11px;" +
                            '">' +
                                bu +
                            "</code>" +
                            '<button id="yurl" style="' + bs + 'width:100%;">' +
                                "COPY URL" +
                            "</button>" +
                        "</div>" +
                        '<button id="ydis" style="' +
                            "margin-top:15px;" +
                            "background:none;" +
                            "border:none;" +
                            "color:#666;" +
                            "text-decoration:underline;" +
                            "cursor:pointer;" +
                            "font-size:13px;" +
                        '">' +
                            "Dismiss" +
                        "</button>";

                    document.body.appendChild(yd);

                    yd.querySelector("#yid").onclick = function () {
                        navigator.clipboard.writeText(bid);
                        this.innerText = "ID Copied!";
                    };

                    yd.querySelector("#yurl").onclick = function () {
                        navigator.clipboard.writeText(bu);
                        this.innerText = "URL Copied!";
                    };

                    yd.querySelector("#ydis").onclick = function () {
                        if (yd.parentNode) {
                            yd.parentNode.removeChild(yd);
                        }
                    };

                    handled = true;
                } else {
                    alert("Business ID not found.");
                }
            } catch (e) {
                alert("Error fetching ID.");
            }

            return;
        }

        /* Sharecare and Healthgrades */
        if (/sharecare\.com$|healthgrades\.com$/.test(h)) {
            if (/\?$/.test(u)) {
                history.replaceState(
                    {},
                    "",
                    location.protocol +
                        "//" +
                        location.hostname +
                        location.pathname
                );
            }

            if (/providers\.sharecare\.com\/doctor\//.test(u)) {
                var aa = document.getElementsByTagName("a");
                var tt;

                for (var ai = 0; ai < aa.length; ai++) {
                    if (
                        aa[ai].textContent.trim() ===
                        "See more reviews on Healthgrades"
                    ) {
                        tt = aa[ai];
                        break;
                    }
                }

                return O(
                    tt &&
                    tt.href &&
                    tt.href.split("?")[0]
                );
            }

            if (/healthgrades\.com$/.test(h)) {
                var hgSlug = location.pathname.match(
                    /\/physician\/([^/?#]+)/i
                );

                if (!hgSlug) {
                    alert("Healthgrades physician URL not found.");
                    return;
                }

                var sourceSlug = hgSlug[1];

                O(
                    "https://providers.sharecare.com/doctor/" +
                    sourceSlug
                );

                return;
            }
        }

        /* Vitals and WebMD */
        if (/vitals\.com$|webmd\.com$/.test(h)) {
            try {
                if (/vitals\.com$/.test(h)) {
                    var vm = document.documentElement.innerHTML.match(
                        /providerId[^"']+/i
                    );

                    if (vm && vm[1]) {
                        O(
                            "https://doctor.webmd.com/doctor/" +
                            vm[1]
                        );

                        return;
                    }
                }

                if (/webmd\.com$/.test(h)) {
                    var wp = location.pathname
                        .replace(/-(overview|claim)\/?$/i, "")
                        .replace(/\/$/, "");

                    var claim = location.origin + wp + "/claim";
                    var box = document.createElement("div");
                    var style = document.createElement("style");

                    box.style.cssText =
                        "position:fixed;" +
                        "top:20px;" +
                        "right:20px;" +
                        "z-index:2147483647;" +
                        "background:#202124;" +
                        "color:#fff;" +
                        "padding:14px 18px;" +
                        "border-radius:9px;" +
                        "font:14px Arial;" +
                        "box-shadow:0 5px 20px #0006;" +
                        "display:flex;" +
                        "align-items:center;" +
                        "gap:12px;";

                    box.innerHTML =
                        '<span style="' +
                            "width:18px;" +
                            "height:18px;" +
                            "border:3px solid #777;" +
                            "border-top-color:#fff;" +
                            "border-radius:50%;" +
                            "display:inline-block;" +
                            "animation:wmspin .7s linear infinite;" +
                        '"></span>' +
                        "<span>Finding Vitals profile...</span>";

                    style.textContent =
                        "@keyframes wmspin{" +
                            "to{" +
                                "transform:rotate(360deg)" +
                            "}" +
                        "}";

                    document.head.appendChild(style);
                    document.body.appendChild(box);

                    function removeLoading() {
                        if (box.parentNode) {
                            box.parentNode.removeChild(box);
                        }

                        if (style.parentNode) {
                            style.parentNode.removeChild(style);
                        }
                    }

                    fetch(claim, {
                        credentials: "include"
                    })
                        .then(function (response) {
                            if (!response.ok) {
                                throw new Error();
                            }

                            return response.text();
                        })
                        .then(function (html) {
                            var match =
                                html.match(
                                    /"vitals_profileurl"\s*:\s*"([^"]+)"/i
                                ) ||
                                html.match(
                                    /https?:\/\/[^"'<\s]*vitals\.com\/doctors\/[^"'<\s]+/i
                                );

                            if (!match) {
                                throw new Error();
                            }

                            var vitalsUrl = match[1] || match[0];

                            vitalsUrl = vitalsUrl
                                .replace(/\\u002f/gi, "/")
                                .replace(/\\\//g, "/")
                                .replace(/&amp;/g, "&")
                                .replace(/["\\]+$/g, "");

                            try {
                                vitalsUrl = decodeURIComponent(vitalsUrl);
                            } catch (e) {}

                            if (!/^https?:/i.test(vitalsUrl)) {
                                vitalsUrl =
                                    "https://www.vitals.com" +
                                    (
                                        vitalsUrl.charAt(0) === "/"
                                            ? ""
                                            : "/"
                                    ) +
                                    vitalsUrl;
                            }

                            window.open(
                                vitalsUrl,
                                "_blank",
                                "noopener,noreferrer"
                            );

                            removeLoading();
                        })
                        .catch(function () {
                            removeLoading();
                            alert("Vitals URL not found");
                        });

                    return;
                }
            } catch (e) {}
        }

        /* Yellow Pages and Superpages */
        if (/yellowpages\.com$|superpages\.com$/.test(h)) {
            var pm;

            if (
                (
                    pm = u.match(
                        /yellowpages\.com\/([^\/]+)\/mip\/([^\/?#]+)/i
                    )
                )
            ) {
                return O(
                    "https://www.superpages.com/" +
                    pm[1] +
                    "/bpp/" +
                    pm[2]
                );
            }

            if (
                (
                    pm = u.match(
                        /superpages\.com\/([^\/]+)\/bpp\/([^\/?#]+)/i
                    )
                )
            ) {
                return O(
                    "https://www.yellowpages.com/" +
                    pm[1] +
                    "/mip/" +
                    pm[2]
                );
            }

            alert("Error");
            return;
        }

       /* DocSpot */
if (h === "docspot.com" || h.endsWith(".docspot.com")) {
    var cleanUrl =
        location.origin +
        location.pathname.replace(/\/+$/, "");

    if (location.search || location.hash) {
        window.location.assign(cleanUrl);
    } else {
        var notice = document.createElement("div");

        notice.style.cssText =
            "position:fixed;" +
            "top:20px;" +
            "left:50%;" +
            "transform:translateX(-50%);" +
            "z-index:2147483647;" +
            "background:#18181b;" +
            "color:#fff;" +
            "padding:10px 18px;" +
            "border-radius:30px;" +
            "font:500 13px system-ui,sans-serif;" +
            "box-shadow:0 4px 12px rgba(0,0,0,.3);";

        notice.textContent = "DocSpot URL is already clean";
        document.documentElement.appendChild(notice);

        setTimeout(function () {
            notice.remove();
        }, 1800);
    }

    return;
}

        /* Default Google Place ID lookup */
        if (!handled) {
            var pid = prompt("Enter Place ID:");

            if (pid) {
                window.open(
                    "https://www.google.com/maps/search/?" +
                    "api=1" +
                    "&query=Google" +
                    "&query_place_id=" +
                    encodeURIComponent(pid),
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        }
    } catch (e) {
        alert("Error");
    }
})();
