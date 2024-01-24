package uiass.eia.myapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.model.DetailCommande;
import uiass.eia.myapi.service.ServiceMetierImp;

import java.util.List;

@Component
public class DetailCommandeDao implements IDetailCommande{
    @Autowired
    private ServiceMetierImp serviceMetierImp;

    @Override
    public List<DetailCommande> getAllDetailCommande() {
        return null;
    }
}
