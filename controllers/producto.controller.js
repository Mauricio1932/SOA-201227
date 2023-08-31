import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import { getProducto } from '../models/producto.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const prod_viewAll = async (req, res) => {
    getProducto.findAll({
        attributes: ["id", "titulo", "descripcion", "fechaCreacion", "estado"],
        where: { deletedAt: null } 
    })
    .then(prods => {
        if (prods.length === 0) {
            res.status(404).json({ message: 'Productos no encontrados' });
        } else {
            const response = prods.map(prod => {
                const estadoMessage = prod.estado ? 'Tarea completada' : 'Tarea incompleta';
                return {
                    ...prod.toJSON(),
                    estadoMessage: estadoMessage
                };
            });
            res.send(response);
        }
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });
    });
}

  const viewProd = async (req, res) => {
    getProducto.findAll({
        where: { id: req.query.id ,deletedAt: null},
        attributes: ["titulo", "descripcion", "fechaCreacion", "estado"]
    })
    .then(prod => {
        if (prod.length === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            const estadoMessage = prod[0].estado ? 'Tarea completada' : 'Tarea incompleta';
            const response = {
                ...prod[0].toJSON(),
                estadoMessage: estadoMessage
            };
            res.send(response);
        }
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });
    });
}


const prod_create = async (req,res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fechaCreacion = req.body.fechaCreacion;
    const estado = req.body.estado;
    

    getProducto
    .create({
    titulo,
    descripcion,
    fechaCreacion,
    estado,
    })
    .then((prod) => {
    //   res.send(prod);
    res.status(200).json({ error: 'Tarea creada extitosamente' });
    })
    .catch((err) => {
    //   console.log(err);
      res.status(400).json({ error: 'Error al crear la tarea' });
    });
    
}

const prod_update = async (req,res) => {
    const { titulo, descripcion, fechaCreacion, estado } = req.body;
    const { id } = req.query;
  
    getProducto.findOne({ where: { id: id ,deletedAt: null} })
      .then(prod => {
        if (!prod) {
          return res.status(404).send('work not found');
        }
  
        prod.update({
        titulo: titulo || prod.titulo,
        descripcion: descripcion || prod.descripcion,
        fechaCreacion: fechaCreacion || prod.fechaCreacion,
        estado: estado !== undefined ? estado : prod.estado
        })
          .then(updated => {
            res.send(updated);
          })
          .catch(err => {
            // console.log(err);
            res.status(500).send('Error updating work');
          });
      })
      .catch(err => {
        // console.log(err);
        res.status(500).send('Error updating work');
      });
}

const prod_delete = async (req, res) => {
    const id = req.query.id;

    getProducto.update(
        { deletedAt: new Date() }, 
        { where: { id: id } }
    )
    .then((r) => {
        res.status(200).json({ message: "Registro marcado como eliminado" });
    })
    .catch((err) => {
        res.status(400).json({ err: 'Error al marcar como eliminado' });
    });
}


export const productoController = {prod_viewAll,viewProd,prod_create,prod_update, prod_delete};