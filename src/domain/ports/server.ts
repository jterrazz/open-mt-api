import Application from 'koa'; // Deeply tied to koa framework

export interface IWebServer {
    start();
    app: Application;
}
