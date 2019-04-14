package com.fullstack.togo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {

    private Map<String, String> locations = new HashMap<>();

    @RequestMapping(value = "/api/setLocation", method = RequestMethod.POST)
    public void setLocation(@RequestBody String bodyString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode body = mapper.readTree(bodyString);
        String name = body.get("name").asText();
        String lngLat = body.get("lngLat").asText();
        locations.put(name, lngLat);
    }

    @RequestMapping(value = "/api/getLocation", method = RequestMethod.POST)
    public String getLocation(@RequestBody String name) {
        return locations.get(name);
    }

    @RequestMapping(value = "/api/removeLocation", method = RequestMethod.DELETE)
    public void removeLocation(@RequestBody String name) {
        locations.remove(name);
    }
}
