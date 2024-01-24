package uiass.eia.myapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.model.Client;
import uiass.eia.myapi.service.ServiceMetierImp;

import java.util.List;

@Component
public class ClientDao implements IClient {
    @Autowired
    private ServiceMetierImp serviceMetierImp;
    @Override
    public List<Client> getAllClients() {
        return serviceMetierImp.getAll();
    }
}
