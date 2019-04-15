package com.fullstack.togo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * This class provides a REST API for accessing location values stored in a MongoDB database.
 */
@RestController
public class Controller {

    private MongoClient mongoClient = new MongoClient();
    private DB database = mongoClient.getDB("Database");
    private DBCollection locations = database.getCollection("Locations");

    /**
     * Store a longitude, latitude pair in the database with location name as key.
     */
    @RequestMapping(value = "/api/setLocation", method = RequestMethod.POST)
    public void setLocation(@RequestBody String bodyString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode body = mapper.readTree(bodyString);
        String name = body.get("name").asText();
        String lngLat = body.get("lngLat").asText();

        DBObject location = new BasicDBObject("name", name).append("lngLat", lngLat);
        locations.insert(location);
    }

    /**
     * Return a longitude, latitude pair which is accessed with the location name.
     */
    @RequestMapping(value = "/api/getLocation", method = RequestMethod.POST)
    public String getLocation(@RequestBody String name) {
        DBObject query = new BasicDBObject("name", name);
        DBCursor cursor = locations.find(query);
        return (String) cursor.one().get("lngLat");
    }

    /**
     * Remove entry in the database with given name.
     */
    @RequestMapping(value = "/api/removeLocation", method = RequestMethod.DELETE)
    public void removeLocation(@RequestBody String name) {
        DBObject query = new BasicDBObject("name", name);
        locations.remove(query);
    }
}
