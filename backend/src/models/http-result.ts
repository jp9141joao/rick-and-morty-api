export class HttpResult<T> {
  // Indica se a operação deu certo ou nao.
  public success: boolean;
  // Guarda os dados retornados ou fica nulo se caso nao have.
  public data: T | null;
  // Mensagem de erro caso algo dê errado.
  public error: string;

  // Usamos os métodos estáticos para criar uma instância.
  private constructor(success: boolean, data: T | null, error: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  // Método para criar um resultado de sucesso
  // Pode receber dados, mas se nada for passado, assume null.
  public static Success<T>(data: T | null = null): HttpResult<T> {
    return new HttpResult<T>(true, data, "");
  }

  // Método para criar um resultado de falha, definindo uma mensagem de erro.
  public static Fail(error: string): HttpResult<any> {
    return new HttpResult<any>(false, null, error);
  }
}
