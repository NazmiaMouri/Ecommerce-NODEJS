const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    orderId: { type: String, required: true, unique: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dress',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

exports.Order = mongoose.model('Order', orderSchema);