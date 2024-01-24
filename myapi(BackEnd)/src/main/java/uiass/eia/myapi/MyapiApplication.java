package uiass.eia.myapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uiass.eia.myapi.service.IServiceMetier;

@SpringBootApplication
public class MyapiApplication implements CommandLineRunner {
    @Autowired
    IServiceMetier serviceMetier;

    public static void main(String[] args) {
        SpringApplication.run(MyapiApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
    }
}
