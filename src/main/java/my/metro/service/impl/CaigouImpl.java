package my.metro.service.impl;

import my.metro.entities.Caigou;
import my.metro.mapper.CaigouMapper;
import my.metro.service.CaigouService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CaigouImpl implements CaigouService {

    @Autowired
    CaigouMapper caigouMapper;

    @Override
    public List<Caigou> getListByCity(Caigou caigou){
        return caigouMapper.getListByCity(caigou);
    }

    @Override
    public double getCaigou(Caigou caigou){
        if(caigou == null){
            return 0;
        }
        return caigouMapper.getCaigou(caigou);
    }

    @Override
    public List<Caigou> getListByYear(Caigou caigou){
        if (caigou == null)
            return null;
        return caigouMapper.getListByYear(caigou);
    }

    @Override
    public List<Caigou> getAllByYear(Caigou caigou){
        if (caigou == null)
            return null;
        return caigouMapper.getAllByYear(caigou);
    }

    @Override
    public List<Caigou> getAllByCity(String caigou){
        if (caigou == null)
            return null;
        return caigouMapper.getAllByCity(caigou);
    }

    @Override
    public List<Caigou> getAllByYearAndCity(Caigou caigou){
        if (caigou == null)
            return null;
        return caigouMapper.getAllByYearAndCity(caigou);
    }

    @Override
    public List<Caigou> getListByItemType(String itemType){
        if (itemType == null)
            return null;
        return caigouMapper.getListByItemType(itemType);
    }

}
