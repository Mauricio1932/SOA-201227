import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";

const producto = getData.sequelizeClient.define('producto',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaCreacion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE, 
        allowNull: true,
    }
},{
    tablename: 'producto',
    paranoid: true, 
})

export const getProducto = producto;
