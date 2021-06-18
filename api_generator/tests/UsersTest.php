<?php

class UsersTest extends \PHPUnit\Framework\TestCase
{
    private $http;

    /**
     *
     */
    public function setUp(): void
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://localhost:8081/']);
    }

    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function testGet()
    {
        $response = $this->http->request('GET', 'api/users');

        $this->assertEquals(200, $response->getStatusCode());

        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $data = json_decode($response->getBody(true), true);
        $this->assertTrue(count($data) > 0);
    }

    /**
     *
     */
    public function tearDown(): void {
        $this->http = null;
    }
}