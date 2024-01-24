package uiass.eia.myapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.model.Commande;
import uiass.eia.myapi.service.ServiceMetierImp;

import java.util.List;

@Component
public class CommandeDao implements ICommande{
    @Autowired
    private ServiceMetierImp serviceMetierImp;

    @Override
    public List<Commande> getAllCommande() {
        return null;
    }
}
