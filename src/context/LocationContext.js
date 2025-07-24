import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from "react";
const LocationContext = createContext(undefined);
export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}
export function LocationProvider({ children }) {
    const [location, setLocation] = useState({
        city: "",
        country: "",
        lat: null,
        lon: null
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Try browser geolocation first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(prev => ({
                    ...prev,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }));
                // Optionally reverse geocode to get city/country
                reverseGeocode(position.coords.latitude, position.coords.longitude);
            }, () => {
                // Fallback to IP-based location
                ipFallback();
            }, { timeout: 10000 });
        }
        else {
            // Geolocation not supported, use IP fallback
            ipFallback();
        }
    }, []);
    const reverseGeocode = async (lat, lon) => {
        try {
            // You could use a geocoding service here if needed
            // For now, we'll just use the IP fallback to get city/country
            ipFallback();
        }
        catch (error) {
            console.error("Reverse geocoding failed", error);
            ipFallback();
        }
    };
    const ipFallback = async () => {
        try {
            const response = await fetch("/api/location");
            const data = await response.json();
            setLocation(prev => ({
                ...prev,
                city: data.city || "",
                country: data.country || ""
            }));
        }
        catch (error) {
            console.error("IP location lookup failed", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(LocationContext.Provider, { value: { location, isLoading }, children: children }));
}
