import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            titulo: "Gestor de empresas COPEREX API",
            version: "1.0.0",
            descripcion: "Api para agregar empresas a INTERFER",
            contacto:{
                nombre: "Andres Artiga",
                correo: "aartiga-2020246@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestorDeEmpresas/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/empresas/empresas.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export {swaggerDocs, swaggerUi}