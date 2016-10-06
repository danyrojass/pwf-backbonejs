/**
 * Clase que implementa el Formulario de alta de personas.
 * @class
 */var cont=0;
var FormularioPersonaView = Backbone.View.extend({

    /**
     * Url del template que corresponde al view
     * @field
     */
    templateURL: "templates/formulario-persona-tmpl.html",

    /**
     * Atributo que define el mapeo de eventos a handlers
     * @field
     */
    events: {
        "click #guardar": "guardar",
    },

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        this.loadTemplate(function () {
            thiz.render();
        });
    },

    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl());
        return this;
    },

    /**
     * Se encarga de añade el nuevo dato al collection que se encuentra en memoria.
     * @function
     */
    guardar: function () {
        var data = {};
        var flag = 0;
        var flagmail = 0;
        //por cada input del view
        this.$el.find("[name]").each(function () {
          if (this.name == "nombre" && this.value == ""){
            flag = 1;
            alert("Nombre, campo obligatorio");
            return 0;
          }
          if (this.name == "apellido" && this.value == ""){
            flag = 1;
            alert("Apellido, campo obligatorio");
            return 0;
          }
          expr = /^[0-9]+$/;
          if (this.name == "telefono")
          if (!expr.test(this.value)){
            flag = 1;
            alert("Telefono, campo obligatorio y Numerico");
            return 0;
          }

            if (this.name == "email"){
              flagmail = validarEmail(this.value);
              //console.log(flagmail);
              //console.log(this.value);
              if (flagmail==0 && this.name == "email") data[this.name] = this.value;
              return 0;
            }


            data[this.name] = this.value;

            var today = new Date();
            data["fechacreacion"] = today.toISOString().substring(0, 10);


        });
        if (flag == 0 && flagmail == 0){
          var model = new PersonaModel(data);

          model.save({}, {
              success: function (model, respose, options) {
                  window.alert("¡Contacto creado!");
                  window.location.reload();
              },
              error: function (model, xhr, options) {
                  window.alert("Imposible crear el contacto.");
                  window.location.reload();
              }
          });
        }
    },

});
