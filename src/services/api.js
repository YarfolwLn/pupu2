const HOST='http://localhost:3000';

export async function getProducts() {
    const response = 
        await fetch (`${HOST}/products`);
    
    return response.json();
}


export async function login(data) {
    const response =
    await fetch(`${HOST}/login`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        const error = new Error(errorData.message || `Ошибка ${response.status}`);
        throw error; // Выбрасываем ошибку!
    }
    return response.json();
}

export async function register(data) {
    const response =
    await fetch(`${HOST}/register`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        const error = new Error(errorData.message || `Ошибка ${response.status}`);
        throw error; // Выбрасываем ошибку!
    }
    return response.json();
}

export async function addToCart(productId) {
        const token = localStorage.getItem('token')
        const response = await fetch(`${HOST}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({productId})
        })
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}))
            throw new Error(errorData.message || `Ошибка ${response.status}`)
        }
        return response.json()
}

export async function getCart() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${HOST}/cart`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка ${response.status}`)
    }
    return response.json()
}

export async function removeFromCart(productId) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${HOST}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка ${response.status}`)
    }
    return response.json()
}

export async function updateCartQuantity(productId, quantity) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${HOST}/cart/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка ${response.status}`)
    }
    return response.json()
}

export async function createOrder() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${HOST}/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка ${response.status}`)
    }
    return response.json()
}

export async function getOrders() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${HOST}/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка ${response.status}`)
    }
    return response.json()
}
