/**
 * Collection de presonas, para simplificar el ejemplo se utiliza un archivo como
 * fuente de datos para simular el GET para obtener los datos.
 */


var PersonaCollection = Backbone.Collection.extend({

    url: 'https://desa03.konecta.com.py/pwf/rest/agenda',
    model: PersonaModel,

    parse : function( response ){
    	
       return response.lista;
    },

});

