const crypto = require('crypto');

module.exports = {
    criptografar(senha) {
        
        const alg = 'aes-256-ctr';
        const pwd = 'tjfdtxdjtjfdtxdjtjfdtxdjtjfdtxdj';
        const iv = 'aaaaaaaaaaaaaaaa';
        const cipher = crypto.createCipheriv(alg, pwd, iv);
        const crypted = cipher.update(senha, 'utf8', 'hex');
        
        return crypted;
    }
}


