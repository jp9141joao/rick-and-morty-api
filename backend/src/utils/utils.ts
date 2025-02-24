export class Utils {
    public static ValorExiste(value: any): boolean {
        return value !== undefined && value !== null && value !== '' && value !== false;
    }    
      
    public static EmailValido(email: any): boolean {
        try {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email) && typeof email == 'string';
        } catch {
            return false;
        }
    }

    public static SenhaValida(password: any): boolean {
        try {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
            return passwordPattern.test(password) && typeof password == 'string';
        } catch {
            return false;
        }
    }

    public static NomeValido(name: any): boolean {
        try {
            const parts = name.trim().split(/\s+/);
    
            if (parts.length < 2) return false;
    
            const isValid = parts.every((part: any) => {
                if (part.length < 2) return false;
    
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/.test(part);
            });
    
            return isValid && typeof name == 'string';;
        } catch {
            return false;
        }
    }
}