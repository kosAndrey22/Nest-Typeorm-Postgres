import { OutgoingHttpHeaders } from 'http';
import {
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { GENERAL_EVENTS } from './constants';

@WebSocketGateway({
  handlePreflightRequest: (req: Request, res: Response): void => {
    const headers: OutgoingHttpHeaders = {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': ['content-type', 'authorization', 'x-token'],
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Max-Age': '1728000',
      'Content-Length': '0',
    };
    res.writeHead(200, headers);
    res.end();
  },
  path: '/ws',
})
export class EventsGateway {

  @WebSocketServer()
  public server: Server;

  public hello(): void {
    this.server.emit(GENERAL_EVENTS.ON_HELLO, { text: 'hello' });
  }

}
