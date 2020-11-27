import { Router } from 'express';
import { EventComponent } from '../components/index';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/events
 *
 * @swagger
 * /v1/events:
 *   get:
 *     description: Get all stored events in Database
 *     tags: ["events"]
 *     security:
 *      - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: An array of events
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Events'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', EventComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/events
 *
 * @swagger
 * /v1/events:
 *   post:
 *      description: Create new Event
 *      tags: ["events"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: event creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventSchema'
 *            example:
 *              title: eventTitle
 *              startDate: 1605285140
 *              endDate: 1605288734
 *              usersIds: ["5fad67c14dde0c65bd1ea312"]
 *      responses:
 *        201:
 *          description: return created event
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/EventSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', EventComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/v1/events/:id
 *
 * @swagger
 * /v1/events/{id}:
 *  get:
 *    description: Get event by eventId
 *    tags: ["events"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique eventId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return event by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/Eventchema'
 */
router.get('/:id', EventComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/events/:id
 *
 * @swagger
 * /v1/events/{id}:
 *  delete:
 *    description: Delete event by eventId
 *    tags: ["events"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique eventId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted event
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/EventSchema'
 */
router.delete('/:id', EventComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
