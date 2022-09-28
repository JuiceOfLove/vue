class Request {
    constructor(host) {
        this.host = host;
    }

    async get(url) {
        const res = await fetch(`${this.host}${url}`);
        if (!res || !res.ok) {
            throw new Error(`An error occured fetcing ${url}\nstatus: ${res.status}`);
        }
        let result = await res.json();
        return result;
    }

    async post(url) {
        const res = await fetch(`${this.host}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).catch(() => { });
        let result = await res.json();
        return result;
    }

    async delete(url) {
        const res = await fetch(`${this.host}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).catch(() => { });
        let result = await res.json();
        return result;
    }

    async getOrders() {
        let result = await this.get('orders');
        return result;
    }

    async getOrder(orderId) {
        let result = await this.get(`orders${orderId}`);
        return result;
    }

    async getDeliveries() {
        let result = await this.get('deliveries');
        return result;
    }

    async addDelivery(orderId) {
        let result = await this.post(`orders${orderId}/delivery`);
        return result;
    }

    async deleteOrder(orderId) {
        let result = await this.delete(`orders${orderId}`)
        return result;
    }

    async deleteDelivery(deliveryId) {
        let result = await this.delete(`deliveries${deliveryId}`)
        return result;
    }

}

export default new Request('http://localhost:3000/')