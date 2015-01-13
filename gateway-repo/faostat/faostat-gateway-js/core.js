if (!window.CORE) {

    window.CORE = {

        timestamps : [],


        /**
         * The base URL is used to load FAOSTAT modules.
         */
        // this should be subsequent part of i.e. 168.202.28.214:8080
        state_prefix : '',
        baseURL : '168.202.28.214:8080',
        baseURL_WDS : 'http://faostat3.fao.org/wds',
        datasource : "faostatdb",

        groupCode : null,

        domainCode : null,

        word : null,

        lang : null,

        CONFIG_MES: {
            prefix                  : 'http://faostat3.fao.org/modules/faostat-mes',
            datasource              : 'faostatdb',
            html_structure          : 'http://faostat3.fao.org/modules/faostat-mes/structure.html',
            rest_mes                : 'http://faostat3.fao.org/wds/rest/mes',
            rest_groupanddomains    : 'http://faostat3.fao.org/wds/rest/groupsanddomains',
            rest_domains            : 'http://faostat3.fao.org/wds/rest/domains',
            I18N_URL                : 'http://faostat3.fao.org/static/faostat/I18N/'

        },

        /**
         * @param module        home, browse, download, compare, search, analysis, mes
         * @param groupCode     FAOSTAT group code, e.g. 'Q'
         * @param groupName     FAOSTAT domain code, e.g. 'QC'
         * @param lang          UI language, e.g. 'E'
         */
        initModule : function(obj) {

            // method to calculate DIV min height
            CORE.contentDIVMinHeight();
            $("#searchFS").show();
            // Store parameters
            var module = obj.module
            CORE.groupCode = obj.section;
            CORE.domainCode = obj.code;
            CORE.lang = obj.lang;

            // Call the init method of the module
            switch (module) {
                case 'home':
                    require(['text!static/faostat/faostat-home-js/template.html', 'HOME'], function (template) {
                        var html = template.replace(/\$_BASE_URL/g, CORE.baseURL);
                        $("#container").empty()
                        $("#container").html(html)
                        FAOSTATHome.loadUI(obj.lang);
                    });
                    break;
                case 'browse':
                    require(['BROWSE'], function () {
                        FAOSTATBrowse.init(CORE.groupCode, CORE.domainCode, obj.lang);
                    });
                    break;
                case 'download':
                    require(['text!static/faostat/faostat-download-js/template.html', 'DOWNLOAD'], function (template) {
                        var html = template.replace(/\$_BASE_URL/g, CORE.baseURL);
                        $("#container").empty()
                        $("#container").html(html)
                        FAOSTATDownload.init(CORE.groupCode, CORE.domainCode, obj.lang);
                    });
                    break;
                case 'compare':
                    require(['COMPARE'], function () {
                        FAOSTATCompare.init(CORE.groupCode, CORE.domainCode, obj.lang);
                    });
                    break;
                //case 'analysis':
                //    require(['FAOSTAT_ANALYSIS'], function (TILESMGR) {
                //        ANALYSIS.init(CORE.groupCode, CORE.domainCode, obj.lang);
                //    });
                //    break;
                case 'analysis':
                    require(['ANALYSIS_TILE_MANAGER'], function (TILESMGR) {
                        TILESMGR.init({'lang': obj.lang, 'lang_iso2': obj.lang_iso2}, null);
                    });
                    break;
                case 'mes':
                    CORE.CONFIG_MES.sectionCode = CORE.groupCode;
                    CORE.CONFIG_MES.subSectionCode = CORE.domainCode;
                    CORE.CONFIG_MES.lang = CORE.lang;
                    require(['MES'], function () {
                        MES.init(CORE.CONFIG_MES )
                    });
                    break;
                case 'search':
                    $('#searchFS').hide()
                    CORE.initModuleSearch(module, obj.word, obj.lang)
                    break;
            }

        },

        /**
         * @param module        home, browse, download, compare, search, analysis, mes
         * @param word          it's the word search in faostat (i.e. Rice)
         * @param lang          UI language, e.g. 'E'
         */
        initModuleSearch : function(module, word, lang) {
            // method to calculate DIV min height
            CORE.contentDIVMinHeight();

            // Store parameters
            CORE.word = word;
            CORE.lang = lang;
            // Call the init method of the module
            switch (module) {
                case 'search':
                    require(['SEARCH'], function (TILESMGR) {
                        FAOSTATSearch.init(CORE.word, CORE.lang);
                    });
                    break;
            }
        },

        /**
         * @param module 	home, browse, download, compare, search, analysis, mes
         * @param group		FAOSTAT group code, e.g. 'Q'
         * @param domain	FAOSTAT domain code, e.g. 'QC'
         * @param lang 		UI language, e.g. 'E'
         *
         * Function linked to the Gateway's menu that load the requested module in the main content.
         */
        loadModule : function(module, group, domain, lang) {
            var url = 'http://' + CORE.baseURL + '/' + module
            if (group) url += '/' + group
            if (domain) url += '/' + domain
            if (lang) url += '/' + lang
            window.location.href = url;
        },

        loadSearchModule : function(module, word, lang) {
            window.location.href = 'http://' + CORE.baseURL + '/' + module + '/' + word + '/' + lang;
        },

        /**
         * @returns {boolean} <code>true</code> if HTML5 is supported, <code>false</code> otherwise
         *
         * Check whether HTML5 is supported or not.
         */
        testHTML5 : function() {
            return history.pushState ? true : false;
        },

        /**
         * @param module 	home, browse, download, compare, search, analysis, mes
         * @param group		FAOSTAT group code, e.g. 'Q'
         * @param domain	FAOSTAT domain code, e.g. 'QC'
         * @param lang 		UI language, e.g. 'E'
         *
         * This function update the URL to allow the bookmark of the user's selection.
         */
        upgradeURL : function(module, group, domain, lang) {
            if (CORE.testHTML5()) {
                var state = CORE.state_prefix
                if (module) state += '/' + module
                if (group) state += '/' + group
                if (domain) state += '/' + domain
                if (lang) state += '/' + lang
                //var state = CORE.state_prefix  + module + '/' + group + '/' + domain + '/' + lang;

                if ( History.getState().data.state != state ) {
                    var t = new Date().getTime();
                    CORE.timestamps[t] = t;
                    History.pushState({timestamp: t, state : state}, state, state);
                }
            }
        },

        stickSelectorsHeader : function() {
            $("#selectorsHead").sticky({topSpacing:0});
        },

        breakLabel: function (lbl) {
            if (lbl && lbl.length > 0 && lbl == 'Indicators from Household Surveys (gender, area, socioeconomics)') {
                return 'Indicators from<br> Household Surveys<br> (gender, area,<br> socioeconomics)';
            } else {
                var chars = 23;
                var c = 0;
                var index = 0;
                for (var i = 0 ; i < lbl.length ; i++) {
                    if (lbl.charAt(i) == ' ') {
                        c++;
                        index = i;
                    }
                    if (i >= chars) {
                        // return lbl.substring(0, i) + '<br>' + lbl.substring(i);
                        return lbl.substring(0, index) + '<br>' + lbl.substring(index);
                    }
                }
                return lbl;
            }
        },

        breakLabelList: function (lbl, charsLength) {
            var chars = 23;
            if ( charsLength != null ) {
                chars = charsLength;
            }
            var c = 0;
            var index = 0;
            for (var i = 0 ; i < lbl.length ; i++) {
                if (lbl.charAt(i) == ' ') {
                    c++;
                    index = i;
                }
                if (i >= chars) {
                    // return lbl.substring(0, i) + '<br>' + lbl.substring(i);
                    return lbl.substring(0, index) + '<br>' + lbl.substring(index);
                }
            }
            return lbl;
        },

        replaceAll: function(text, stringToFind, stringToReplace) {
            var temp = text;
            var index = temp.indexOf(stringToFind);
            while(index != -1){
                temp = temp.replace(stringToFind,stringToReplace);
                index = temp.indexOf(stringToFind);
            }
            return temp;
        },

        getLangProperties: function(callback) {
            var I18NLang = '';
            switch (CORE.lang) {
                case 'F' : I18NLang = 'fr'; break;
                case 'S' : I18NLang = 'es'; break;
                default: I18NLang = 'en'; break;
            }
            var path =  'http://'+ CORE.baseURL +'/static/faostat/I18N/';

            $.i18n.properties({
                name: 'I18N',
                path: path,
                mode: 'both',
                language: I18NLang,
                callback: function() {
                    // FAOSTATGateway._loadLabels();
                    callback();
                }
            });
        },

        reloadModule: function(lang) {
            CORE.lang = lang;
            var url = window.location.href;
            url = url.substring(0, url.length -2);
            url = url + '/' + CORE.lang;
            window.location.href = url;
        },

        /** TODO: to be completed **/
        loadModule: function(module, options) {
            // TODO: move in in CORE.js
            var url = 'http://' + CORE.baseURL +'/' + module;
            if (options) url += '/'+ options
            url += '/' + CORE.lang
            window.location.href = url;
        },

        contentDIVMinHeight: function() {
            var additional_height = 180
            var height = $(window).height() -  ($("#fs-head").outerHeight() + $("#fs-menu-header-sticky-wrapper").outerHeight() + additional_height); // this is the footer height that is not calculated dynamically
            $("#container").css("min-height",height+"px");
        },

        show_country_alert: function() {
            alert($.i18n.prop('_country_alert'));
        }
    };
}
