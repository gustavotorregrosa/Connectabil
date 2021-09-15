import * as mongoose from "mongoose";

export const VagaSchema = new mongoose.Schema({
    nome: {type: String},
    descricao: {type: String},
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    },
    tipo: {
      type: String,
      enum: ['remota', 'presencial', 'mista'],
      default: 'presencial'
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

    empresas: [{ type: mongoose.Types.ObjectId, ref: 'Empresa' }],
}, {timestamps: true, collection: 'vaga'});