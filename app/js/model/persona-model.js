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
        "username": ""
    }
});
