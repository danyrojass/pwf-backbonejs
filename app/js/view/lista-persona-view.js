/**
 * Clase que implementa el listado de personas.
 * @class
 */
var ListaPersonaView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */


    templateURL: "templates/lista-persona-tmpl.html",


    events: {
        "click #filtrar": "filtrar2",
        "click #atras": "atras",
        "click #adelante": "adelante",
        "click #eliminarContacto": "eliminarContacto",
        "click #editarContacto": "editarContacto",
        "click #guardarContacto": "guardarContacto"
    },

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        //cuando el collection cambia, se carga la lista.
        this.collection.on("add", this.render, this);
        this.listenTo(this.collection, 'save', this.render);
        this.loadTemplate(function () {
            //una vez descargado el template se invoca al fetch para obtener los datos
            //del collection
            thiz.collection.fetch();
        });

    },


    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var contador = 0;
        var tmpl = _.template(this.template);
        var coll = this.collection.toJSON();

        coll = this.convertFecha(coll);
        
        this.$el.html(tmpl({
            collection: coll
        }));
        return this;
    },

    convertFecha: function(coleccion){
        var contador = 0;
        for(item in coleccion){
          var fechacreacion = coleccion[contador].fechacreacion;
          var anho = fechacreacion.substring(0, 4);
          var mes = fechacreacion.substring(5, 7);
          var dia = fechacreacion.substring(8,10);
          var hora = fechacreacion.substring(11,19);
          coleccion[contador].fechacreacion = dia + '-' + mes + '-' + anho + ' ' + hora;

          var fechamodificacion = coleccion[contador].fechamodificacion;
          if(fechamodificacion != null){
            var anho1 = fechamodificacion.substring(0, 4);
            var mes1 = fechamodificacion.substring(5, 7);
            var dia1 = fechamodificacion.substring(8,10);
            var hora1 = fechamodificacion.substring(11,19);
            coleccion[contador].fechamodificacion = dia1 + '-' + mes1 + '-' + anho1 + ' ' + hora1;
          }

          contador++;
        }
        return coleccion;
      },
    
    filtrar2: function () {
        var data = {};
        var thiz = this;

        this.filtro=$(this.el).find('#filtrado').val();

        thiz.collection.fetch({ data: $.param({inicio: 0, cantidad: 5, filtro: this.filtro}),
            success : function(collection, response) {
                thiz.render();
            }
        });
      },

      filtrar3: function (currentPage) {
          var data = {};
          var thiz = this;
          thiz.collection.fetch({ data: $.param({inicio: currentPage, cantidad: 5, filtro: this.filtro}),
              success : function(collection, response) {
                  thiz.render();
              }
          });
        },


      adelante: function() {
          this.currentPage+=5;
          this.filtrar3(this.currentPage);
      },

      atras: function() {
        this.currentPage-=5;
        this.filtrar3(this.currentPage);
        },
    
    eliminarContacto: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);
        var selec = this.collection.get(this.selectedPersona);
        selec.destroy({
            dataType : 'text',
            success: function(model, response, options) {
                window.alert("¡Contacto elimindo!");
                window.location.reload();
            },
            error: function(model, response, options) {
                window.alert("Imposible eliminar el contacto.");
                window.location.reload();
            }
        });


    },
    
    editarContacto: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);

        var a = document.getElementById(id+"nombre");
        a.type= "text";
        var aa = document.getElementById(id+"nombre1");
        aa.style='display:none;';

        var b = document.getElementById(id+"apellido");
        b.type= "text";
        var bb = document.getElementById(id+"apellido1");
        bb.style='display:none;';


        var c = document.getElementById(id+"alias");
        c.type= "text";
        var cc = document.getElementById(id+"alias1");
        cc.style='display:none;';

        var d = document.getElementById(id+"telefono");
        d.type= "text";
        var dd = document.getElementById(id+"telefono1");
        dd.style='display:none;';

        var e = document.getElementById(id+"direccion");
        e.type= "text";
        var ee = document.getElementById(id+"direccion1");
        ee.style='display:none;';

        var f = document.getElementById(id+"email");
        f.type= "text";
        var ff = document.getElementById(id+"email1");
        ff.style='display:none;';

        var g = document.getElementById("guardarContacto");
        g.style.display = "block";

      },

      guardarContacto: function(e){
          e.preventDefault();
          var id = $(e.currentTarget).data("id");
          this.selectedPersona = this.collection.get(id);

          nombre = document.getElementById(id+"nombre");
          apellido = document.getElementById(id+"apellido");
          alias = document.getElementById(id+"alias");
          telefono = document.getElementById(id+"telefono");
          direccion = document.getElementById(id+"direccion");
          email = document.getElementById(id+"email");

          var contacto = new PersonaModel({ id });
          contacto.fetch({
	          success: function (contactoResponse) {
		          contactoResponse.set("nombre", nombre.value);
		          contactoResponse.set("apellido", apellido.value);
		          contactoResponse.set("alias", alias.value);
		          contactoResponse.set("telefono", telefono.value);
		          contactoResponse.set("direccion", direccion.value);
		          contactoResponse.set("email", email.value);
		
		          contactoResponse.save({}, {
		              success: function (model, respose, options) {
		                  window.alert("¡Contacto modificado!");
		                  window.location.reload();
		              },
		              error: function (model, xhr, options) {
		                  window.alert("Imposible modificar el contacto.");
		                  window.location.reload();
		              }
				  });
			  }
		  });
      }

});