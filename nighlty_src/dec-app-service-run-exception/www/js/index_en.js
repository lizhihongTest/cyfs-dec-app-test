! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(r, a, function(t) {
                return e[t]
            }.bind(null, a));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 10)
}({
    10: function(e, t) {
        var n, r = function(e) {
                var t = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)");
                return t ? t.pop() : ""
            },
            a = function(e, t) {
                document.cookie = "{0}={1};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax".replace("{0}", e).replace("{1}", t)
            };

        function o(e) {
            $("#info-form").css("display", "none"), $("#success-info").css("display", "block"), $("#success-info").html(e)
        }

        function i() {
            setTimeout((function() {
                $("#info-form").css("display", "block"), $("#success-info").css("display", "none")
            }), 2e3)
        }! function() {
            var e = document.getElementById("webgl");
            e.style.width = window.innerWidth + "px";
            for (var t = e.getContext("webgl"), n = document.getElementById("vertexShader").innerText, r = document.getElementById("fragmentShader").innerText, a = function(e, t, n) {
                    var r = e.createShader(e.VERTEX_SHADER),
                        a = e.createShader(e.FRAGMENT_SHADER);
                    e.shaderSource(r, t), e.shaderSource(a, n), e.compileShader(r), e.compileShader(a);
                    var o = e.createProgram();
                    return e.attachShader(o, r), e.attachShader(o, a), e.linkProgram(o), e.useProgram(o), o
                }(t, n, r), o = t.getAttribLocation(a, "position"), i = t.getAttribLocation(a, "scale"), c = t.getUniformLocation(a, "modelViewMatrix"), s = t.getUniformLocation(a, "projectionMatrix"), l = new Float32Array(7500), u = new Float32Array(2500), f = 0, d = 0, m = 0; m < 50; m++)
                for (var p = 0; p < 50; p++) l[f] = 100 * m - 2500, l[f + 1] = 0, l[f + 2] = 100 * p - 2500, u[d] = 1, f += 3, d++;
            var v = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, v), t.bufferData(t.ARRAY_BUFFER, u, t.STATIC_DRAW), t.vertexAttribPointer(i, 1, t.FLOAT, !1, 0, 0), t.enableVertexAttribArray(i);
            var h = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, h), t.bufferData(t.ARRAY_BUFFER, l, t.STATIC_DRAW), t.vertexAttribPointer(o, 3, t.FLOAT, !1, 0, 0), t.enableVertexAttribArray(o), t.enable(t.DEPTH_TEST);
            var b = window.innerWidth,
                y = window.innerHeight,
                A = new THREE.PerspectiveCamera(60, b / y, 1, 1e4);
            A.position.set(200, 300, 200), A.position.set(944, 206, -262), A.lookAt(new THREE.Vector3(0, 0, 0)), A.updateProjectionMatrix(), A.updateMatrixWorld(!0);
            var g = new THREE.Matrix4;
            g.copy(A.projectionMatrix);
            var R = new Float32Array(g.elements);
            t.uniformMatrix4fv(s, !1, R);
            var x = new THREE.Matrix4;
            x.copy(A.matrixWorldInverse);
            var w = new Float32Array(x.elements);
            t.uniformMatrix4fv(c, !1, w);
            var E = 0,
                T = 0,
                $ = window.innerWidth / 2;
            window.innerHeight;
            ! function e() {
                A.position.x += .01 * (T - A.position.x), A.updateMatrixWorld(!0), x.copy(A.matrixWorldInverse);
                var n = new Float32Array(x.elements);
                t.uniformMatrix4fv(c, !1, n);
                for (var r = 0, a = 0, o = 0; o < 50; o++)
                    for (var i = 0; i < 50; i++) l[r + 1] = 50 * Math.sin(.3 * (o + E)) + 50 * Math.sin(.5 * (i + E)), u[a] = 8 * (Math.sin(.3 * (o + E)) + 1.3) + 8 * (Math.sin(.5 * (i + E)) + 1.3), r += 3, a++;
                E += .1, t.bindBuffer(t.ARRAY_BUFFER, v), t.bufferData(t.ARRAY_BUFFER, u, t.STATIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, h), t.bufferData(t.ARRAY_BUFFER, l, t.STATIC_DRAW), requestAnimationFrame(e), t.drawArrays(t.POINTS, 0, 2500)
            }(), document.addEventListener("mousemove", (function(e) {
                T = e.clientX - $, e.clientY
            }), !1), document.addEventListener("touchstart", (function(e) {
                1 === e.touches.length && (e.preventDefault(), T = e.touches[0].pageX - $, e.touches[0].pageY)
            }), !1), document.addEventListener("touchmove", (function(e) {
                1 === e.touches.length && (e.preventDefault(), T = e.touches[0].pageX - $, e.touches[0].pageY)
            }), !1)
        }(), n = navigator.language.startsWith("zh"), 1 != r("kyc") && n && $("#warning").css("display", "block"), $("#card-back").on("click", "#submit", (function() {
            var e = $("#email").val(),
                t = $("#firstName").val(),
                n = $("#lastName").val(),
                r = $("#country").val(),
                a = $("#message").val(),
                c = JSON.stringify({
                    email: e,
                    first_name: t,
                    last_name: n,
                    country: r,
                    message: a
                }),
                s = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            e && t && n && a ? s.test(e) ? t.length >= 50 || n.length >= 50 ? (o("Name cannot exceed 50 characters !"), i()) : r.length >= 100 ? (o("Country cannot exceed 100 characters !"), i()) : a.length >= 300 ? (o("Message cannot exceed 300 characters !"), i()) : $.post("/api/webInfo", c, (function(e) {
                200 === e.code ? (o("The information has been submitted, we will contact you as soon as possible."), setTimeout((function() {
                    $("#email").val(""), $("#firstName").val(""), $("#lastName").val(""), $("#country").val(""), $("#message").val(""), $("#info-form").css("display", "block"), $("#success-info").css("display", "none")
                }), 2e3)) : (o("Please fill in the necessary information !"), i())
            })) : (o("E-mail format is incorrect !"), i()) : (o("Please fill in the necessary information !"), i())
        })), $("#bbb").on("click", (function() {
            $(".turn").css("transform", "rotateY(180deg)"), $(document.body).width() < 768 && ($(".card-front").css("display", "none"), $(".card-back").css("display", "block"))
        })), $("#continue").on("click", (function() {
            a("kyc", 1), $("#warning").css("display", "none")
        }))
    }
});