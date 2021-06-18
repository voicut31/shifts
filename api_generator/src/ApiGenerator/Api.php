<?php
/**
 * Created by PhpStorm.
 * User: Voicu Tibea
 * Date: 2019-01-21
 * Time: 17:22
 */

namespace ApiGenerator;

use Error;

/**
 * Class Api
 * @package ApiGenerator
 */
class Api
{
    const TYPE_INTEGER = 'Integer';
    const TYPE_STRING = 'String';
    const TYPE_TEXT = 'Text';
    const TYPE_DATE_TIME = 'DateTime';

    /**
     * @var Schema
     */
    private $schema;

    /**
     * @var
     */
    private $apiStructure;

    /**
     *
     */
    public const AVAILABLE_REQUEST_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

    /**
     * @var mixed
     */
    private $requestMethod;

    /**
     * Api constructor.
     * @param Schema $schema
     * @param $apiStructure
     */
    public function __construct(Schema $schema, $apiStructure)
    {
        $this->schema = $schema;
        $this->apiStructure = $apiStructure;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        if (!in_array($this->requestMethod, self::AVAILABLE_REQUEST_METHODS)){
            throw new Error('Method not available');
        }
    }

    /**
     * Create the API response
     *
     * @param $module
     * @param $id
     * @param $params
     */
    public function response($module, $id, $params)
    {
        if ($module !== null && !isset($this->apiStructure[$module])){
            throw new Error('No module available in the api');
        }

        switch ($this->requestMethod){
            case 'OPTIONS':
                return $this->sendOptionHeaders();
                break;
            case 'POST':
                $this->schema->insert($module, $params);
                $data = ['message' => 'ok'];
                break;
            case 'PUT':
            case 'PATCH':
                $this->schema->update($module, $id, $params);
                $data = ['message' => 'ok'];
                break;
            case 'DELETE':
                $this->schema->delete($module, $id);
                return $this->sendDeleteHeaders();
                break;
            case 'GET' && $id !== null:
                $data = $this->schema->getResult($module, $id);
                break;
            case 'GET':
                $data = $this->schema->getResults($module);
                break;
            default:
                break;
        }

        $this->sendJsonResponse($data);
    }

    /**
     * Output the json response
     *
     * @param $data
     */
    private function sendJsonResponse($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    /**
     * Send option headers
     */
    private function sendOptionHeaders()
    {
        header('Access-Control-Allow-Headers: content-type, authorization, x-total-count');
        header('Access-Control-Allow-Methods: GET, OPTIONS, POST, PUT, PATCH, DELETE');
    }

    /**
     * Send delete header
     */
    private function sendDeleteHeaders()
    {
        header('Content-Type: application/json');
    }
}
