import * as mongoose from "mongoose";

export const EmpresaSchema = new mongoose.Schema({
    nome: {type: String},
    endereco: {type: String},
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
        toJSON: false,
        select: false
    },
    deletedAt: {
      type: Date,
      default: null,
      toJSON: false,
      select: false
    },

}, {timestamps: true, collection: 'empresa'});