/**
 *
 * FENIX (Food security and Early warning Network and Information Exchange)
 *
 * Copyright (c) 2011, by FAO of UN under the EC-FAO Food Security
 Information for Action Programme
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
package org.fao.fenix.faostat.gateway

import com.google.gson.Gson
import org.json.JSONObject

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

/**
 * @author <a href="mailto:guido.barbaglia@fao.org">Guido Barbaglia</a>
 * @author <a href="mailto:guido.barbaglia@gmail.com">Guido Barbaglia</a>
 * */
@Path("")
class FAOSTATGatewayRESTService {

    def CONFIG_FILE = 'static/faostat/config/config.json'

    // config contained in the CONFIG FILE
    def $_GATEWAY_BASE_INDEX = '$_GATEWAY_BASE_INDEX'
    def $_GATEWAY_BASE_URL = '$_GATEWAY_BASE_URL'

    // configs to override on the HTML
    def $_MODULE_CONFIG = '$_MODULE_CONFIG'
    def $_BASE_URL = '$_BASE_URL'
    def DEFAULT_LANGUAGE = 'E'

    /**
     * @param module    FAOSTAT module: home
     * @param lang      EN, FR or ES
     * @return          HTML code to be rendered by the browser
     */
//    @GET
//    @Produces(MediaType.TEXT_HTML)
//    @Path("/{lang}")
//    public String loadModuleHomeDefault_2(@PathParam("lang") String lang) {
//        return loadDefaultModule('home', lang)
//    }

    /** HOME **/

    /**
     * @param module    FAOSTAT module: home
     * @param lang      EN, FR or ES
     * @return          HTML code to be rendered by the browser
     */
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("home")
    public String loadModuleHomeDefault() {
        return loadDefaultModule('home')
    }

    /**
     * @param module    FAOSTAT module: home
     * @param lang      EN, FR or ES
     * @return          HTML code to be rendered by the browser
     */
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("home/{lang}")
    public String loadModuleHomeLang(@PathParam("lang") String lang) {
        return loadDefaultModule('home', lang)
    }



    /** BROWSE **/
    // TODO: needed?
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("browse/{section}")
    public String loadBrowseSection(@PathParam("section") String section) {
        loadDefaultModule('browse', DEFAULT_LANGUAGE, section, null)
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/browse/{section}/{code}")
    public String loadBrowseSectionCode(@PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('browse', DEFAULT_LANGUAGE, section, code)
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("browse/{section}/{code}/{lang}")
    public String loadBrowseSectionCodeLang(@PathParam("lang") String lang, @PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('browse', lang, section, code)
    }


    /** COMPARE **/
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("compare")
    public String loadCompareSection() {
        loadDefaultModule('compare', DEFAULT_LANGUAGE)
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("compare/{lang}")
    public String loadCompareSectionLang(@PathParam("lang") String lang) {
        loadDefaultModule('compare', lang)
    }

    // TODO: this is the old version
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("compare/{section}/{code}/{lang}")
    public String loadCompareSectionCodeLang(@PathParam("lang") String lang, @PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('compare', lang)
    }



    /** MES **/
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("mes/{section}/{lang}")
    public String loadMesSectionLang(@PathParam("lang") String lang, @PathParam("section") String section) {
        loadDefaultModule('mes', lang, section)
    }

    // TODO: this is the old version
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("mes/{section}/{code}/{lang}")
    public String loadMesSectionCodeLang(@PathParam("lang") String lang, @PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('mes', lang, section, code)
    }

    /** DOWNLOAD **/
    // TODO: needed?
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("download/{section}")
    public String loadDownloadSection(@PathParam("section") String section) {
        loadDefaultModule('download', DEFAULT_LANGUAGE, section, null)
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("download/{section}/{code}")
    public String loadDownloadSectionCode(@PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('download', DEFAULT_LANGUAGE, section, code)
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("download/{section}/{code}/{lang}")
    public String loadDownloadSectionCodeLang(@PathParam("lang") String lang, @PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('download', lang, section, code)
    }

    /** analysis **/
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("analysis/{section}/{code}/{lang}")
    public String loadAnalysisSectionCodeLang(@PathParam("lang") String lang, @PathParam("section") String section, @PathParam("code") String code) {
        loadDefaultModule('analysis', lang, section, code)
    }



    /** SEARCH **/
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("search/{word}")
    String loadModuleSearchLang(@PathParam("word") String word) {
        return loadSearchModule('search', DEFAULT_LANGUAGE, word)
    }

    /**
     * @param module   FAOSTAT module: browse, download, search, compare, analysis, mes
     * @param word      The word to search ( i.e. 'rice')
     * @param lang      E, F or S
     * @return          HTML code to be rendered by the browser
     */
    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("search/{word}/{lang}")
    String loadModuleSearchWordLang(@PathParam("word") String word, @PathParam("lang") String lang) {
        return loadSearchModule('search', lang, word)
    }

    private String loadSearchModule(String module, String lang=DEFAULT_LANGUAGE, String word=null) {
        HashMap<String, String> configMap = readConfigFile();
        String html = getHtml(configMap);
        def json = createJson(module, lang)
        json.put("word", word)
        return html.replace($_MODULE_CONFIG, json.toString())
    }


    private String loadDefaultModule(String module, String lang=DEFAULT_LANGUAGE, String section=null, String code=null) {
        HashMap<String, String> configMap = readConfigFile();
        String html = getHtml(configMap);
        def json = createJson(module, lang, section, code)
        return html.replace($_MODULE_CONFIG, json.toString())
    }


    HashMap<String, String> readConfigFile() {
        println(ConfigServlet.PATH)
        def config = ConfigServlet.PATH + CONFIG_FILE;
        def configContent = new File(config).text;
        Gson g = new Gson();
        println(configContent)
        return g.fromJson(configContent, HashMap.class);
    }

    String getFAOSTATLang(String iso2) {
        if      ( iso2.toUpperCase() == "EN") return "E";
        else if ( iso2.toUpperCase() == "FR") return "F";
        else if ( iso2.toUpperCase() == "ES") return "S";
        return "E";
    }


    String getLangISo2(String lang) {
        if      ( lang.toUpperCase() == "E") return "EN";
        else if ( lang.toUpperCase() == "F") return "FR";
        else if ( lang.toUpperCase() == "S") return "ES";
        return "en";
    }

    String getHtml(configMap) {
        // HTLM CONTENT
        //def base_index = ConfigServlet.PATH + configMap.get($_GATEWAY_BASE_INDEX);
        def base_index = configMap.get($_GATEWAY_BASE_INDEX);
        base_index = new File(base_index).text
        return base_index.replace($_BASE_URL, configMap.get($_GATEWAY_BASE_URL))
    }

    JSONObject createJson(module, lang, section=null, code=null) {
        JSONObject obj = new JSONObject()
        obj.put("module", module);
        obj.put("lang", lang);
        obj.put("lang_iso2", getLangISo2(lang));
        obj.put("section", section);
        obj.put("code", code);
        return obj
    }
}