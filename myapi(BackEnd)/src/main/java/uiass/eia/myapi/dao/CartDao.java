package uiass.eia.myapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.model.CartItem;
import uiass.eia.myapi.service.ServiceMetierImp;

import java.util.List;

@Component
public class CartDao implements ICart{
    @Autowired
    private ServiceMetierImp serviceMetierImp;
    @Override
    public List<CartItem> getAllCart() {
        return null;
    }
}
