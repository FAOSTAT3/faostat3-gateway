if (!window.FAOSTATHome) {

    window.FAOSTATHome = {


        /**
         * This map is used to avoid modules libraries to be loaded more than once.
         */
        loadUI : function(lang) {
            //FAOSTATHome._labels();
            FAOSTATDatabaseUpdate.getDatabaseUpdates(CORE.datasource, CORE.lang);
            FS_HOME_CHART.init();

            CORE.getLangProperties(FAOSTATHome._labels)
            FAOSTATHome._loadNews('whatsNew-content', 'whatsNew', lang);
            FAOSTATHome._loadNews('comingUp-content', 'comingUp', lang);
            FAOSTATHome._loadLinks('fs-links-content', lang);
            FAOSTATHome._showBulkDownload();
            FAOSTATHome._modal_survey();

            <!-- Country Profiles -->
            $('#btnCountry').fancybox({
                'width':1100,
                'height':1000,
                'type':'iframe',
                'autoScale':'false'
            });
            $('#btnRelease').fancybox({
                'width':1100,
                'height':1000,
                'type':'iframe',
                'autoScale':'false'
            });
        },

        _loadNews: function(id, type, lang) {
            var url = 'http://' + CORE.baseURL + '/static/faostat/faostat-home-js/resources/' + type +'.json';
            $('#' + id).empty()
            $.getJSON(url, function(data) {
                for( var i=0; i < data.length; i++) {
                    var html = '<h4><b>'+ data[i].title[lang] + '</b></h4>';
                    html += '<p>' + data[i].description[lang] +'</p>';
                    $('#' + id).append(html);
                }
            });
        },

        _loadLinks: function(id, lang) {

            var url = '//' + CORE.baseURL + '/static/faostat/faostat-home-js/resources/links.json';
            $.getJSON(url, function(data) {
                $('#' + id).empty()
                for( var i=0; i < data.length; i++) {
                    var html = '<a href="' + data[i].link[lang] +'" target="_blank">'+ data[i].title[lang] +'</a>';
                    $('#' + id).append(html);
                }
            });

        },

        _labels: function() {
            /** setting lang properties **/
            // CORE.getLangProperties(FAOSTATHome._loadLabels);

            /* labels */
            $('.ico-pr').html($.i18n.prop('_production'));
            $('.ico-tr').html($.i18n.prop('_trade'));
            $('.ico-fs').html($.i18n.prop('_foodSupply'));
            $('.ico-fsecurity').html($.i18n.prop('_foodsecurity'));
            $('.ico-re').html($.i18n.prop('_resources'));
            $('.ico-em').html($.i18n.prop('_ghg'));
            $('.ico-el').html($.i18n.prop('_ghgLandUse'));
            $('.ico-in').html($.i18n.prop('_investment'));
            $('.ico-fo').html($.i18n.prop('_forestry'));
            $('.ico-pi').html($.i18n.prop('_prices'));
            $('.ico-ae').html($.i18n.prop('_agriEnviromental'));
            $('.ico-fb').html($.i18n.prop('_foodBalance'));
            $('.ico-asti').html($.i18n.prop('_asti'));
            $('.ico-pop').html($.i18n.prop('_population'));
            $('.ico-po').html($.i18n.prop('_population'));
            $('.ico-cb').html($.i18n.prop('_commoditybalances'));
            $('.ico-emergencyresponse').html($.i18n.prop('_emergency_response'));

            $('#whatsNewText').html($.i18n.prop('_whatsNew'));
            $('#databaseUpdatesText').html($.i18n.prop('_databaseUpdates'));
            $('#comingUpText').html($.i18n.prop('_comingUp'));
            $('#releaseCalendarText').html($.i18n.prop('_releaseCalendar'));
            $('#partners').html($.i18n.prop('_partners'));
            $('#faoLinks').html($.i18n.prop('_faoLinks'));

            $('.fs-browse-text').html($.i18n.prop('_fs_browse_text'));
            $('.fs-download-text').html($.i18n.prop('_fs_download_text'));

            $('#fs-home-find-data').html($.i18n.prop('_fs_home_find_data'));

            $('.fs-rankings').html($.i18n.prop('_fs_rankings') + " ");
            $('.fs-country-region').html($.i18n.prop('_fs_country_region')+ " ");

            $('.fs-arrow').append($.i18n.prop('_fs_arrow'));

            $('#fs-coming-soon').html($.i18n.prop('_fs_coming_soon'));

            $('#fs-country-profiles').html($.i18n.prop('_fs_country_profiles'));

            $('#fs-essdd').prepend($.i18n.prop('_essdd'));

            $('#fs-release-calendar').prepend($.i18n.prop('_releaseCalendar'));

            $('#FAOSTAT-ZIP-Download').append($.i18n.prop('_downloadZip'));
            $('#FAOSTAT-ZIP-Download').append($.i18n.prop('_database'));
            $('#FAOSTAT-ZIP-Download').append($.i18n.prop('_withoneclick'));

            $("#fs-home-sy").html($.i18n.prop('_fs_sy'));
            $("#fs-home-sy-2013").prepend($.i18n.prop('_fs_sy'));
            $("#fs-home-sy-description").html($.i18n.prop('_fs_sy_description'));

            $("#fs-home-hm").html($.i18n.prop('_fs_hm_title'));
            $("#fs-home-hm-text").prepend($.i18n.prop('_fs_hm_text'));
            $("#fs-home-hm-description").html($.i18n.prop('_fs_hm_description'));


            $("#partners").html($.i18n.prop('_partners'));
            $("#fs-featured-links").html($.i18n.prop('_featured_links'));
            $("#fs-contacts").html($.i18n.prop('_contacts'));

            $("#fs-highlights").html($.i18n.prop('_highlights'));

            /** tooltips **/
            var placement = "s"
            $('#ifpri').attr("title", "International Food Policy Research Institute (IFPRI)");
            $("#ifpri").powerTip({placement: placement});

            $('#ilo').attr("title","International Labour Organization (ILO)");
            $("#ilo").powerTip({placement: placement});

            $('#unfccc').attr("title","United Nations Framework Convention on Climate Change (UNFCC)");
            $("#unfccc").powerTip({placement: placement});

            $('#oecd').attr("title","Organisation for Economic Co-operation and Development (OECD)");
            $("#oecd").powerTip({placement: placement});

            $('#unstats').attr("title","United Nations Statistics Division (UNSTATS)");
            $("#unstats").powerTip({placement: placement});

            $('#usda').attr("title","United States Department of Agriculture (USDA)");
            $("#usda").powerTip({placement: placement});

            $('#worldbank').attr("title","World Bank" );
            $("#worldbank").powerTip({placement: placement});

            $('#wto').attr("title", "World Trade Organization (WTO)");
            $("#wto").powerTip({placement: placement});

            $('#eurostat').attr("title", "EUROSTAT");
            $("#eurostat").powerTip({placement: placement});

            $('#itto').attr("title", "International Tropical Timber Organization");
            $("#itto").powerTip({placement: placement});

            $('#unece').attr("title", "United Nations Economic Commission for Europe (UNECE)");
            $("#unece").powerTip({placement: placement});

            $('#wco').attr("title", "World Customs Organization (WCO)");
            $("#wco").powerTip({placement: placement});

            $('#wfp').attr("title", "World Food Programme (WFP)");
            $("#wfp").powerTip({placement: placement});

/*            $("#fs-home-sy-link").click(function(){
                window.open("http://www.fao.org/economic/ess/ess-publications/ess-yearbook/en", "_blank");
            });*/

            $("#fs-home-hm-link").click(function(){
                switch (CORE.lang.toUpperCase()) {
                    case "E" :
                        window.open("http://www.fao.org/economic/ess/ess-publications/ess-yearbook/en/#.Vgz8j3ZStHx", "_blank");
                        break;
                    case "F" :
                        window.open("http://www.fao.org/economic/ess/ess-publications/lannuaire-statistique/fr/#.Vg0htnZStHw", "_blank");
                        break;
                    case "S" :
                        window.open("http://www.fao.org/economic/ess/ess-publications/anuario-estadistico/es/#.Vg0hwHZStHw", "_blank");
                        break;
                }

            });
        },

        _showBulkDownload: function() {
            $.ajax({
                type: 'GET',
                url: CORE.baseURL_WDS + '/rest/bulkdownloads/' + CORE.datasource + '/0/E',
                dataType: 'json',
                success: function (response) {
                    if (typeof response == 'string')
                        response = $.parseJSON(response);

                    $('#FAOSTAT-ZIP-Download').append("<em> " + response[0][4].substring(0, 10) + "</em>");
                },
                error: function (err, b, c) {
                }
            });

            $("#FAOSTAT-ZIP-Download").click(function(){
                window.open("http://faostat3.fao.org/ftp-faostat/Bulk/FAOSTAT.zip", "_blank");
                FAOSTAT_STATS.bulkDownloadZip();
            });
        },

        _modal_survey: function() {
            $("#modal-11").addClass("md-show");
        }
    };
}
