if (!window.FAOSTATDatabaseUpdate) {

    window.FAOSTATDatabaseUpdate = {

        lang: '',
        db: '',

        getDatabaseUpdates: function(db, lang) {
            FAOSTATDatabaseUpdate.lang = lang;
            FAOSTATDatabaseUpdate.db = db;
            CORE.getLangProperties(FAOSTATDatabaseUpdate._getDatabaseUpdates);
        },

        _getDatabaseUpdates: function(db, lang) {
            var q = {};
            q.query = "SELECT TOP 10 groupcode, groupname" + FAOSTATDatabaseUpdate.lang + ", domaincode, domainname" + FAOSTATDatabaseUpdate.lang + ", DATENAME(mm, dateupdate) AS Month,  DATENAME(yyyy, dateupdate) AS Year  " +
                "FROM Domain " +
                "ORDER BY dateupdate DESC ";
            var data = {};
            data.datasource = FAOSTATDatabaseUpdate.db,
            data.thousandSeparator = ',';
            data.decimalSeparator = '.';
            data.decimalNumbers = this.decimalValues;
            data.json = JSON.stringify(q);

            var _this = this;
            //console.log(data);
            $.ajax({
                type : 'POST',
//                url : 'http://' + CORE.baseURL + '/wds/rest/table/json',
               url : 'http://faostat3.fao.org/wds/rest/table/json',
                //url : 'http://fenixapps.fao.org/wds/rest/table/json',
                data : data,
                success : function(response) {

                    $("#database-updates").empty();

                    if (typeof response == 'string')
                        response = $.parseJSON(response);

                    var html = '';
                    html += '<ul>';
                    var month = ""
                    var year = ""
                    for (
                        var i = 0 ; i < response.length ; i++) {
                        if (month != response[i][4]) {
                            // create new div with month and year
                            month = response[i][4];
                            year = response[i][5];
                            // TODO: month multilanguage
                            html += '<h5>'+ $.i18n.prop('_' + month.toLocaleLowerCase()) + ' ' + year + '</h5>'
                        }
                        html += '<span style="cursor:pointer;" id="update_' +response[i][2] +'"><b>'+ response[i][3] + "</b> - " + response[i][1]  +'</span>';
                    }


                    html += '</ul>';
                    $("#database-updates").html(html);
                    for (var i = 0 ; i < response.length ; i++) {
                        var g = response[i][0];
                        var d =  response[i][2];
                        $("#update_" + response[i][2]).click({group: g, domain: d}, function(event) {
                            CORE.loadModule('download', event.data.group + '/' + event.data.domain);
                        });
                        $("#update_" + response[i][2]).attr('title', $.i18n.prop('_goToDownload'));
                        $("#update_" + response[i][2]).powerTip({placement: 'n'});
                    }
                },
                error : function(err, b, c) { }
            });
        }


    };
}