/**
 * Model que corresponde al recurso persona.
 */
var PersonaModel = Backbone.Model.extend({
    /**
     * Atributos por defecto del model
     * @field
     */
    defaults: {
        "nombre": "",
        "apellido": "",
        "alias": "",
        "telefono": "",
        "email": "",
        "direccion": "",
        "fechacreacion": "",
        "fechamodificacion": null
    },
    urlRoot: 'https://desa03.konecta.com.py/pwf/rest/agenda',


});